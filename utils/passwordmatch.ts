import bcrypt from 'bcrypt';

export async  function passwordMatch(dbPass: string, pass: string): Promise<boolean> {
     return await bcrypt.compare(pass, dbPass);
}