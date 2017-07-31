var app = new (require("express"))();
var wt = require("webtask-tools");
var jwt = require("express-jwt");
var stripe = require("stripe")();

app.use((req, res, next) => {
  jwt({
    secret:
      "-----BEGIN CERTIFICATE-----\n" +
      req.webtaskContext.secrets.AUTH0_PUBLIC_KEY.match(/.{1,64}/g).join("\n") +
      "\n-----END CERTIFICATE-----\n",
    algorithms: ["RS256"],
    issuer: `https://${req.webtaskContext.secrets.AUTH0_DOMAIN}/`,
    audience: req.webtaskContext.secrets.AUTH0_CLIENT_ID
  })(req, res, next);
});

app.get("/", function(req, res) {
  res.end("Hello, world!");
});

sub_AyBm7U84aclSG6;
app.get("/subscriptions/delete", function(req, res) {
  stripe.subscriptions.del(
    req.webtaskContext.data.subscriptionID,
    { api_key: req.webtaskContext.secrets.STRIPE_SECRET },
    function(err, confirmation) {
      if (err) {
      }

      if (confirmation) {
        res.send(confirmation);
      }
    }
  );
});

module.exports = wt.fromExpress(app);
