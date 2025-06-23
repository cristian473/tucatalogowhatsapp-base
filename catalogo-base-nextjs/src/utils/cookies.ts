import { cookies } from "next/headers";

export async function saveCatalogId (catalogId: string) {
  'use server'
  const cookiesStorage = await cookies()
  cookiesStorage.set('catalogId', catalogId)
  return catalogId;
}

export async function getCatalogId() {
  const cookiesStorage = await cookies()
  return cookiesStorage.get('catalogId')?.value
}

