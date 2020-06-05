const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Customers = require("../models/Customer");
const Vendors = require("../models/Vendor");
const router = express.Router();

//Customers
router.post("/customer-register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Customers.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json({ message: "error adding user", err });
    });
});

// router.post("/customer/login", (req, res) => {
//   // implement login
//   let { email, password } = req.body;

//   Customers.findBy({ email })
//     .first()
//     .then((user) => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         const token = generateToken(user);

//         res.status(200).json({
//           message: `Welcome ${user.email}`,
//           token,
//         });
//       } else {
//         res.status(401).json({ message: "bad credentials" });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "error logging in", err });
//     });
// });

//Vendors
router.post("/vendor-register", (req, res) => {
  // implement registration
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 8);
  user.password = hash;

  Vendors.add(user)
    .then((saved) => {
      res.status(201).json(saved);
    })
    .catch((err) => {
      res.status(500).json({ message: "error adding user", err });
    });
});

// router.post("/vendorlogin", (req, res) => {
//   // implement login
//   let { email, password } = req.body;
//   Vendors.findBy({ email })
//     .first()
//     .then((user) => {
//       if (user && bcrypt.compareSync(password, user.password)) {
//         const token = generateToken(user);
//         res.status(200).json({
//           message: `Welcome ${user.email}`,
//           token,
//         });
//       } else {
//         res.status(401).json({ message: "bad credentials" });
//       }
//     })
//     .catch((err) => {
//       res.status(500).json({ message: "error logging in", err });
//     });
// });
/// END Vendor

function generateToken(user) {
  const secret = process.env.JWT_secret;
  const payload = {
    subject: user.id,
    email: user.email,
  };

  const options = {
    expiresIn: "1h",
  };

  return jwt.sign(payload, secret, options);
}

router.get("/customer", (req, res) => {
  Customers.find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
//practice login
router.post("/login", async (req, res) => {
  let { email, password } = req.body;

  Vendors.findBy({ email })
    .first()
    .then((user) => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);
        res.status(200).json({
          message: `Welcome vendor ${user.email}`,
          role: "vendor",
          token,
        });
      } else {
        Customers.findBy({ email })
          .first()
          .then((user) => {
            if (user && bcrypt.compareSync(password, user.password)) {
              const token = generateToken(user);

              res.status(200).json({
                message: `Welcome Customer ${user.email}`,

                token,
              });
            } else {
              res.status(401).json({ message: "bad credentials" });
            }
          })
          .catch((err) => {
            res.status(500).json({ message: "error logging as customer", err });
          });
      }
    })
    .catch((err) => {
      res.status(500).json({ message: "error logging as vendor", err });
    });
});

module.exports = router;