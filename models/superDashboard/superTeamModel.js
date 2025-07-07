const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const permissionSchema = new mongoose.Schema({
    module: String,
    subModule: String,
  authorized: {
    create: Boolean,
    view: Boolean,
    edit: Boolean,
    delete: Boolean
  },
  status: {
    create: Boolean,
    view: Boolean,
    edit: Boolean,
    delete: Boolean
  },
  ownData: {
    create: Boolean,
    view: Boolean,
    edit: Boolean,
    delete: Boolean
  },
  otherUserData: {
    create: Boolean,
    view: Boolean,
    edit: Boolean,
    delete: Boolean
  }
})

const superTeamMemberSchema = new mongoose.Schema({
    image: { type: String, default: '' },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    designation: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String, required: true },
    password: { type: String, required: true }, 

    // userRole: { type: mongoose.Schema.Types.ObjectId, ref: 'UserRole', default: null },
    userRole: String,
    enableCustomAccess: {type: Boolean, default: false},
    isVerified: { type : Boolean, default: false},
    otp: Number,
    otpExpiry: Date,
    customPermissions: {
        type: [permissionSchema],
        default: []
    },
    lastLogin: { type: Date },
    createdBy: { type: String },
    updatedBy: { type: String },
    authorized: { type: String, enum: ['Approved', 'Pending', 'Rejected'], default: 'Pending' },
    authorizedBy: { type: String },
    authorizedAt: { type: Date },
    status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' },
    resetPasswordToken: { type: String },
    resetPasswordExpires: { type: Date },
    
}, { timestamps: true });

superTeamMemberSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

superTeamMemberSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('superTeamMember', superTeamMemberSchema);