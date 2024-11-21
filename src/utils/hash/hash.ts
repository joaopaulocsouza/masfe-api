import bcrypt from 'bcrypt'

export const encrypt = async (text: string): Promise<any> => {
    return await bcrypt.hash(text, 13)
}

export const compare = async (text: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(text, hash)
}