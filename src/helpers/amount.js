export const getAmount = (cart) => {
    let amount = 0;

    cart.forEach(element => {
        amount += element.precio * element.cantidad
    });

    return amount
}