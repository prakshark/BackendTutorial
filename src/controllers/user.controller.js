import {asyncHandler} from "../utils/asyncHandler.js";
import {ApiError} from "../utils/apiError.js";
import {User} from "../models/user.model.js";
import {uploadOnCloudinary} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const registerUser = asyncHandler(async(req, res) => {
    // Get user details from frontend/ postman
    // Validation
    // Check if user already exists ( using username or email)
    // check for images
    // check for avatar
    // Upload to cloudinary
    // now, create user object - create entry in dB
    // remove paswword and refresh token from response
    // check for user creation
    // return res

    const {fullname, email, username, password} = req.body;
    fullname = fullname.trim();
    email = email.trim();
    username = username.trim();
    console.log(fullname, email, username, password);

    if(fullname === "") {
        throw new ApiError("Full Name is required", 400);
    }
    if(email === "") {
        // You can also apply other logic to check the validity of the email
        throw new ApiError("Email is required", 400);
    }
    if(username === "") {
        throw new ApiError("Username is required", 400);
    }
    if(password === "") {
        throw new ApiError("Password is required", 400);
    }
    
    // User.findOne({email})
    const existedUser = User.findOne({
        $or: [{username}, {email}]
    })

    if(existedUser) {
        throw new ApiError("User already exists", 409);
    }

    const avatarLocalPath = req.files?.avatar[0]?.path
    const coverImageLocalPath = req.files?.coverImage[0]?.path


    if(!avatarLocalPath)  {
        throw new ApiError("Please upload both avatar", 400);
    }


    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)


    if(!avatarLocalPath)  {
        throw new ApiError("Please upload both avatar", 400);
    }


    const user = await User.create({
        fullname,
        email,
        username: username.toLowerCase(),
        password,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
    })


    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    if(!createdUser) {
        throw new ApiError("User creation failed", 500);
    }


    return res.status(201).json(
        new ApiResponse(200, createdUser, "User registered successfully")
    )

})

export {registerUser} 