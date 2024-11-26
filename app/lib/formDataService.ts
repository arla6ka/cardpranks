// app/lib/formDataService.ts
import clientPromise from './mongodb';
import { ObjectId } from 'mongodb';

export async function storeFormData(data: any) {
  const client = await clientPromise;
  const collection = client.db('postcard').collection('formData');
  const result = await collection.insertOne({
    ...data,
    createdAt: new Date(),
  });
  return result.insertedId.toString();
}

export async function getFormData(id: string) {
  const client = await clientPromise;
  const collection = client.db('postcard').collection('formData');
  return await collection.findOne({ _id: new ObjectId(id) });
}

export async function deleteFormData(id: string) {
  const client = await clientPromise;
  const collection = client.db('postcard').collection('formData');
  await collection.deleteOne({ _id: new ObjectId(id) });
}