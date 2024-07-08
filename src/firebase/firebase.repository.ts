import { app } from 'firebase-admin';
import { Inject, Injectable } from '@nestjs/common';

@Injectable()
export class FirebaseRepository {
  private db: FirebaseFirestore.Firestore;

  constructor(@Inject('FIREBASE_APP') private firebaseApp: app.App) {
    this.db = firebaseApp.firestore();
  }

  getCollection(collectionName: string): FirebaseFirestore.CollectionReference {
    return this.db.collection(collectionName);
  }
}
