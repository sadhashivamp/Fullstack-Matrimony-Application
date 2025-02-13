const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    age: { type: String },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    dob: { type: String },

    bio: { type: String, default: "" }, // ✅ Allows empty values
    religion: { type: String, default: "" },
    caste: { type: String, default: "" },
    motherTongue: { type: String, default: "" },


    education: { type: String },
    occupation: { type: String },
    income: { type: String },
    height: { type: String },
    weight: { type: String },
    diet: { type: String },
    drinking: { type: String },
    smoking: { type: String },
    fatherName: { type: String },
    motherName: { type: String },
    siblings: { type: String },
    native: { type: String },
    preferredAge: { type: String },
    preferredHeight: { type: String },
    preferredLocation: { type: String },
    profilePhoto: { type: String, default: "" },
    gallery: [{ type: String }],
    lastCompletedStep: { type: Number, default: 0 } // ✅ Track last completed step
}, { timestamps: true });

module.exports = mongoose.model("Profile", profileSchema);
