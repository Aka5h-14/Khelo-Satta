// Convert paisa (stored in DB) to rupees (for display)
export const paisaToRupees = (paisa) => {
    return (paisa / 100).toFixed(2);
};

// Convert rupees to paisa (for storage)
export const rupeesToPaisa = (rupees) => {
    return Math.floor(parseFloat(rupees) * 100);
};

// Format rupees for display with ₹ symbol
export const formatRupees = (paisa) => {
    return `₹${paisaToRupees(paisa)}`;
};

// Validate and convert input amount to paisa
export const validateAndConvertAmount = (amount) => {
    const rupees = parseFloat(amount);
    if (isNaN(rupees) || rupees < 0) {
        return 0;
    }
    return rupeesToPaisa(rupees);
}; 