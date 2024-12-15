const Auction = require("../models/Auction");




exports.addAuction = async ({
  title,
  description,
  category,
  itemQuantity,
  startingPrice,
  createdBy,
  contactInfo,
  image,
  endTime,
}) => 
{
  try {
    


    const newAuction = new Auction({
      title,
      description,
      category,
      itemQuantity,
      startingPrice,
      currentBid: startingPrice, // Initialize currentBid with startingPrice
      createdBy,
      contactInfo: {
        mobileNumber: contactInfo.mobileNumber,
        address: contactInfo.address,
        state: contactInfo.state,
        district: contactInfo.district,
        subDistrict: contactInfo.subDistrict,
        village: contactInfo.village,
      },
      image,
      endTime,
      expiredAt: endTime, // Set the expiredAt field as the endTime
    });

    // Save the auction to the database
    const savedAuction = await newAuction.save();

    // Respond with the saved auction
   
  } catch (error) {
    console.error("Error adding auction:", error.message);

  }
};





/**
 * Fetch all auctions
 */
exports.getAllAuctions = async (req, res) => 
  {
  try {
    // Fetch all auctions from the database
    const auctions = await Auction.find().populate('createdBy', 'name email');

    if (!auctions || auctions.length === 0) {
      return res.status(404).json({ message: "No auctions found." });
    }

    // Respond with the fetched auctions
  //  return auctions;
  return auctions;
  
  } catch (error) {
    console.error("Error fetching all auctions:", error.message);
    // res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};



exports.addChat=async({auctionId,name,message})=>
{
  try
  {   
        
        const auction=await Auction.findById(auctionId);

        auction.chat.push({
            name,
            message
        })

        
        await auction.save();
  }
  catch(err)
  {
    
  }
}