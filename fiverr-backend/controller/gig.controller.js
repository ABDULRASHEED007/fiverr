import Gig from "../models/gig.model.js"
import createError from "../utils/createError.js"

export const createGig = async (req, res, next) => {
    if (!req.isSeller) return next(createError(403, "Only seller can create a gig!"))

    const newGig = new Gig({
        userId: req.userId,
        ...req.body,
    });

    try {
        const savedGig = await newGig.save()
        res.status(201).json(savedGig);


    } catch (error) {
        next(error)
    }



}
export const deleteGig = async (req, res, next) => {

    try {
        const gig = await Gig.findById(req.params.id);

        if (gig.userId !== req.userId) return next(createError(403, "You Can Delete only Your Gig!!"))

        await Gig.findByIdAndDelete(req.params.id)
        res.status(200).send("Gig has been Deleted!!")


    } catch (error) {
        next(error)
    }



}
export const getGig = async (req, res, next) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if (!gig) next(createError(404, "Gig Not Found!!"))
        res.status(200).send(gig)

    } catch (error) {
        next(error)
    }


}
export const getGigs = async (req, res, next) => {
    const query = req.query;

    try {

        if (query) {


            const filters = {
                ...(query.userId && { userId: query.userId }),
                ...(query.cat && { cat: query.cat }),
                ...((query.max || query.min) && {
                    price: {
                        ...(query.min && { $gte: query.min }),
                        ...(query.max && { $lte: query.max })
                    }
                }),
                ...(query.search && { title: { $regex: query.search, $options: "i" } })
            }

            const gigs = await Gig.find(filters).sort({ [query.sort]: -1 });
            res.status(200).send(gigs);

        } else {
            const allGigs = await Gig.find();
            res.status(200).send(allGigs);
        }


        // const gigs = await Gig.find(filters.sort({ [query.sort]: -1 }));

    } catch (error) {
        next(error)
    }


}


