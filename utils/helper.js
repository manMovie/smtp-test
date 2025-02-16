function generateRandomEmail(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < 10; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    const domain = 'moviecum.online'; // You can change this to any domain you prefer
    return `${result}@${domain}`;
}
module.exports = generateRandomEmail;