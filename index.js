const express = require("express");
const mongoose = require("mongoose");
const cokieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/dev");
require("./models/user");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();

app.use(
	cokieSession({
		//config options for cookie-session
		//days and time
		maxAge: 30 * 24 * 60 * 60 * 1000,
		//keys - random
		keys: [keys.cookieKey]
	})
);

app.use(passport.initialize());
app.use(passport.session());

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
