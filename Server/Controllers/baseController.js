const db = require('../Model/baseModel')
const bcrypt = require('bcrypt');
const saltRounds = 10

//====== User Register Submission on the route /submitSignup ===
const submitSignup = async (req, res) => {
    try {
        const [existingUsers] = await db.promise().query('SELECT * FROM users WHERE email = ?', [req.body.email]);

        if (existingUsers && existingUsers.length > 0) {
            return res.json({ status: false, message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
        await db.promise().query('INSERT INTO users (email, password) VALUES (?, ?)', [req.body.email, hashedPassword]);

        console.log('Data inserted successfully');
        res.json({ status: true, message: 'Data inserted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: false, message: 'Internal server error' });
    }
};

//====== User Login Submission on the route /submitlogin ===
const submitLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const [existingUsers] = await db.promise().query('SELECT * FROM users WHERE email = ?', [email]); /*FINDING THE USER WITH THE EMAIL*/

    if (!existingUsers || existingUsers.length === 0) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }

    const user = existingUsers[0];
    const isPasswordValid = await bcrypt.compare(password, user.password);    /*BCRYPT AND COMPARE THE PASSWORD*/
    if (!isPasswordValid) {
      return res.status(401).json({ status: false, message: 'Invalid password' });
    }

    res.json({ status: true, message: 'Successfully logged in' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
};
//====== homePageListing on the route /homePageListing ===

const homePageListing = async(req,res)=>{
  try {
    const [existingUsers] = await db.promise().query('SELECT * FROM users');
    if(existingUsers){
      res.status(200).json({status:true,users:existingUsers})
    }
  }catch{
    res.status(500).json({ status: false, message: 'Internal server error' });
  }
}

// ==========Function to save a new chat message ==========

const saveChatMessage = async (message, chatId) => {
  try {
    await db.promise().query('INSERT INTO discussions (senderEmail, receiverEmail, message) VALUES (?, ?, ?)', [message.senderEmail, chatId, message.message]);
    console.log('Chat message saved successfully');
  } catch (error) {
    console.error('Error saving chat message: ' + error.stack);
    throw error;
  }
};

// Function to get all chat messages between two users
const getChatMessages = async (req, res) => {
  try {
    const {receiver,sender} = req.query
    const [chatMessages] = await db.promise().query('SELECT * FROM discussions WHERE (senderEmail = ? AND receiverEmail = ?) OR (senderEmail = ? AND receiverEmail = ?) ORDER BY createdAt', [sender, receiver, receiver, sender]);
    res.json({allMessages:chatMessages})
  } catch (error) {
    console.error('Error getting chat messages: ' + error.stack);
    throw error;
  }
};

// Controller function to delete a discussion and its messages
const deleteDiscussion = async (req, res) => {
  const {id} = req.query;
  console.log(id)
  try {
    db.query('DELETE FROM discussions WHERE id = ?', [id], (err, result) => {
      if (err) {
        console.log(err);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
      } else {
        // console.log('Deleted discussion:', result);
        res.status(200).json({ success: true, message: 'Discussion deleted successfully' });
      }
    });
  } catch (error) {
    console.error('Error deleting discussion:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};



module.exports = { submitLogin,submitSignup,homePageListing,saveChatMessage,getChatMessages,deleteDiscussion};
