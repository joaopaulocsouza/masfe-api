export interface UserProps {
    id?: number;           // ID é opcional, pois será gerado pelo banco de dados
    name: string;
    email: string;
    password: string;
    photo?: string;        // Opcional
    gender?: string;       // Opcional
    occupation?: string;   // Opcional
    endereco?: string;     // Opcional
    birthday: Date;
  }
  