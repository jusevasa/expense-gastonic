import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { FirebaseRepository } from '../firebase/firebase.repository';

import { UpdateIncomeDto } from './dto/update-payment.dto';
import { CreateIncomeDto } from './dto/create-income.dto';
import { IncomeDto } from './dto/income.dto';

@Injectable()
export class IncomesService {
  private collection;

  constructor(private firebaseRepository: FirebaseRepository) {
    this.collection = this.firebaseRepository.getCollection('incomes');
  }

  async getAllIncomes(userId: string): Promise<IncomeDto[]> {
    const incomes = await this.collection.where('userId', '==', userId).get();

    return incomes.docs.map((doc) => ({
      id: doc.id,
      date: doc.data().date,
      amount: doc.data().amount,
      description: doc.data().description,
    }));
  }

  async getIncomeById(incomeId: string): Promise<IncomeDto> {
    const doc = await this.collection.doc(incomeId).get();
    if (!doc.exists) {
      throw new NotFoundException('Income not found');
    }

    return {
      id: doc.id,
      date: doc.data().date,
      amount: doc.data().amount,
      description: doc.data().description,
      paid: doc.data().paid,
    };
  }

  async addIncome(userId: string, income: CreateIncomeDto): Promise<IncomeDto> {
    if (income.amount <= 0) {
      throw new BadRequestException('Income amount must be greater than 0');
    }

    const docRef = await this.collection.add({
      ...income,
      userId,
      paid: false,
      createdAt: new Date(),
    });
    const doc = await docRef.get();
    return {
      id: doc.id,
      date: doc.data().date,
      amount: doc.data().amount,
      description: doc.data().description,
      paid: doc.data.paid,
    };
  }

  async updateIncome(
    incomeId: string,
    income: UpdateIncomeDto,
  ): Promise<IncomeDto> {
    if (income.amount <= 0) {
      throw new BadRequestException('Income amount must be greater than 0');
    }

    await this.collection
      .doc(incomeId)
      .update({ ...income, updatedAt: new Date() });
    const updatedDoc = await this.collection.doc(incomeId).get();
    return {
      id: updatedDoc.id,
      date: updatedDoc.data().date,
      amount: updatedDoc.data().amount,
      description: updatedDoc.data().description,
      paid: updatedDoc.data().paid,
    };
  }

  async deleteIncome(incomeId: string): Promise<void> {
    await this.collection.doc(incomeId).delete();
  }

  async getTotalIncomeAmountForUser(userId: string): Promise<number> {
    const incomesSnapshot = await this.collection
      .where('userId', '==', userId)
      .get();
    return incomesSnapshot.docs.reduce(
      (total, doc) => total + doc.data().amount,
      0,
    );
  }
}
