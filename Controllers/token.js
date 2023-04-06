//token controllers

const Token = require('../models/token');

// @desc    Get all tokens

// @route   GET /api/v1/tokens

// @access  Public

exports.getTokens = async (req, res, next) => {

    try {
    
        const tokens = await Token.find();
    
        return res.status(200).json({
    
        success: true,
    
        count: tokens.length,
    
        data: tokens
    
        });
    
    } catch (err) {
    
        return res.status(500).json({
    
        success: false,
    
        error: 'Server Error'
    
        });
    
    }
    
    }

// @desc    Add token

// @route   POST /api/v1/tokens

// @access  Public

exports.addToken = async (req, res, next) => {


    try {
    
        const { user, tokenAddress, issuefaced } = req.body;
    
        const token = await Token.create(req.body);
    
        return res.status(201).json({
    
        success: true,
    
        data: token
        
    
        });
    
    } catch (err) {
    
        if(err.name === 'ValidationError') {
    
        const messages = Object.values(err.errors).map(val => val.message);
    
        return res.status(400).json({
    
            success: false,
    
            error: messages
    
        });
    
        } else {
    
        return res.status(500).json({
    
            success: false,
    
            error: 'Server Error'
    
        });
    
        }
    
    }

}

