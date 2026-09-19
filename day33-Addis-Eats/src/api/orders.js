export async function placeOrder(form) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Order sent:", form);

      resolve({
        id: Date.now(),
        ...form,
      });
    }, 1500);
  });
}
