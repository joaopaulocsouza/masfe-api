const generateId = (): string => {
    const timestamp = Date.now().toString();
    
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let aleatorio = '';
    for (let i = 0; i < 25 - timestamp.length; i++) {
      aleatorio += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
    }
    
    return timestamp + aleatorio;
}

export default generateId