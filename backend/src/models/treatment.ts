import db from '@/configs/firestore';

interface TreatmentData {
  documentId?: string;
  id: number;
  name: string;
  treatment_date: Date;
  treatment_description: string[];
  medications_prescribed: string[];
  cost: number;
}

interface TreatmentDataResponse extends Omit<TreatmentData, 'treatment_date'> {
  treatment_date: {
    _seconds: number;
    _nanoseconds: number;
  };
  created_at: string;
}

export default class TreatmentModel {
  constructor(
    public id: number,
    public name: string,
    public treatment_date: Date,
    public treatment_description: string[],
    public medications_prescribed: string[],
    public cost: number,
    public documentId?: string,
  ) {}

  static async find(): Promise<TreatmentModel[]> {
    return new Promise(async (resolve, reject) => {
      try {
        const snapshot = await db.collection('treatments').orderBy('created_at', 'desc').get();
        const documents = snapshot.docs.map((doc) => {
          const data = doc.data() as TreatmentDataResponse;
          const id = data?.id;
          const name = data?.name;
          const treatment_date = new Date(data.treatment_date?._seconds * 1000); // Convert Firestore timestamp to Date
          const treatment_description = data?.treatment_description;
          const medications_prescribed = data?.medications_prescribed;
          const cost = data?.cost;
          const documentId = doc?.id;

          return new TreatmentModel(
            id,
            name,
            treatment_date,
            treatment_description,
            medications_prescribed,
            cost,
            documentId,
          );
        });
        resolve(documents);
      } catch (error: any) {
        reject(error?.message);
      }
    });
  }

  save(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      try {
        const docRef = await db.collection('treatments').add({
          id: this.id,
          name: this.name,
          treatment_date: this.treatment_date,
          treatment_description: this.treatment_description,
          medications_prescribed: this.medications_prescribed,
          cost: this.cost,
          created_at: new Date(),
        });
        resolve(docRef.id);
      } catch (error: any) {
        reject(error?.message);
      }
    });
  }
}
