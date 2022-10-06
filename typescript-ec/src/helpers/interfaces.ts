export interface categoryTypes {
    id: number,
    name: string,
    image: string
}

export interface productsType {
    category: [number, string, string],
    description: string,
    images: [string, string, string] | string,
    price: number,
    title: string
}

export interface categoryProdctsList{
    id:number,
    title:string,
    price:number,
    description:string,
    images:[string, string, string] | string
}

export type createUserType = {
    name: string,
    email:string,
    password: string,
    avatar:string
}

export type login ={
    email:string,
    password:string
}

export type createProduct = {
    title:string,
    price: number,
    description: string,
    categoryId: number,
    images: []
}