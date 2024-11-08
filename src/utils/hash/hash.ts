import bcrypt from 'bcrypt'

export const encrypt = async (text: string): Promise<any> => {
    return await bcrypt.hash(text, 13)
}