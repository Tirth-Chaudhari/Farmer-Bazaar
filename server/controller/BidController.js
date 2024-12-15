const Bid = require('../models/Bid');
const Auction = require('../models/Auction');
const moment = require('moment');
const User = require('../models/User');

exports.addBid = async ({ auctionId, bidAmount, expiredAt,userId }) => 
{
  
  
  const bidderId = userId // Assuming the user is authenticated and their ID is available in req.user

  // Validate input
 
  try {
    // Find the auction by ID
    
    const auction = await Auction.findById(auctionId);
    

    
    // Check if the auction is open
    

    // Check if the bid is placed within the auction expiration time
   

    
    const newBid = new Bid({
      auctionId,
      bidderId,
      bidAmount,
      expiredAt,
    });

    // Save the bid to the database
    
    await newBid.save();
    

    // Update the auction with the new current bid and add the bidder to the bidders list
    auction.currentBid = bidAmount;

   const bidder= await User.findById(bidderId)
   console.log(bidder);
   
    auction.bidders.push({
      bidderId,
      bidAmount,
      name:bidder.name,
      email:bidder.email,
      contactInfo:bidder.contactInfo
    });

    // Optionally, update auction winner if this is the highest bid
   
      auction.winner = {
        bidderId,
        bidAmount,
      };
    

    await auction.save();
    

    // Return success response
  // const obj={
  //     message: 'Bid placed successfully!',
  //     bid: newBid,
  //     auction: auction,
  //   };
  //   return obj
  } catch (error) {
    console.error(error);
    const obj={
      message:'error'
    }
    return obj;
  }
};
