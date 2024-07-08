import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FirebaseRepository } from '../firebase/firebase.repository';
import { CreateDebtDto } from './dto/create-debt.dto';
import { UpdateDebtDto } from './dto/update-debt.dto';
import { DebtDto } from './dto/debt.dto';
import { IncomesService } from 'src/incomes/incomes.service';

@Injectable()
export class DebtsService {
  private collection;

  constructor(
    private firebaseRepository: FirebaseRepository,
    private incomesService: IncomesService,
  ) {
    this.collection = this.firebaseRepository.getCollection('debts');
  }

  async getAllDebts(userId: string): Promise<DebtDto[]> {
    const debts = await this.collection.where('userId', '==', userId).get();

    return debts.docs.map((doc) => ({
      id: doc.id,
      date: doc.data().date,
      amount: doc.data().amount,
      description: doc.data().description,
      userId: doc.data().userId,
    }));
  }

  async getDebtById(incomeId: string): Promise<DebtDto> {
    const doc = await this.collection.doc(incomeId).get();
    if (!doc.exists) {
      throw new NotFoundException('Debt not found');
    }

    return {
      id: doc.id,
      date: doc.data().date,
      amount: doc.data().amount,
      description: doc.data().description,
      incomeId: doc.data().incomeId,
      createdAt: doc.data().createdAt,
    };
  }

  async getTotalDebtAmountForIncome(incomeId: string): Promise<number> {
    const debtsSnapshot = await this.collection
      .where('incomeId', '==', incomeId)
      .get();
    let totalAmount = 0;
    debtsSnapshot.forEach((doc) => {
      totalAmount += doc.data().amount;
    });
    return totalAmount;
  }

  async addDebt(userId: string, debt: CreateDebtDto): Promise<DebtDto> {
    const income = await this.incomesService.getIncomeById(debt.incomeId);

    if (!income) {
      throw new BadRequestException('Invalid income ID');
    }

    if (income.paid) {
      throw new BadRequestException('Cannot add debt to a paid income');
    }

    const totalDebtAmount = await this.getTotalDebtAmountForIncome(
      debt.incomeId,
    );

    if (income.amount < totalDebtAmount + debt.amount) {
      throw new BadRequestException('Debt amount cannot exceed income amount');
    }

    if (totalDebtAmount + debt.amount === income.amount) {
      await this.incomesService.updateIncome(income.id, {
        ...income,
        paid: true,
      });
    }

    const docRef = await this.collection.add({
      ...debt,
      userId,
      createdAt: new Date(),
    });
    const doc = await docRef.get();
    return {
      id: doc.id,
      date: doc.data().date,
      amount: doc.data().amount,
      description: doc.data().description,
      incomeId: doc.data().incomeId,
    };
  }

  async updateDebt(debtId: string, debt: UpdateDebtDto): Promise<DebtDto> {
    await this.collection
      .doc(debtId)
      .update({ ...debt, updatedAt: new Date() });
    const updatedDoc = await this.collection.doc(debtId).get();
    return {
      id: updatedDoc.id,
      date: updatedDoc.data().date,
      amount: updatedDoc.data().amount,
      description: updatedDoc.data().description,
      incomeId: updatedDoc.data().incomeId,
    };
  }

  async deleteDebt(debtId: string): Promise<void> {
    await this.collection.doc(debtId).delete();
  }

  async getTotalDebtAmountForUser(userId: string): Promise<number> {
    const debtsSnapshot = await this.collection
      .where('userId', '==', userId)
      .get();
    return debtsSnapshot.docs.reduce(
      (total, doc) => total + doc.data().amount,
      0,
    );
  }
}
