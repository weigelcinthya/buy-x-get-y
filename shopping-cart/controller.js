exports.applyDiscount = (req, res) => {
    console.log(req.body);

    const processedData = {
        cart: {
            reference: "2d832fe0-6c96-4515-9be7-4c00983539c1"
        }
    }

    res.status(200).json(processedData);
}