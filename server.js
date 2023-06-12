const jsonServer = require('json-server');
const cors = require('cors');
const server = jsonServer.create();
const router = jsonServer.router('explore.json');
const middlewares = jsonServer.defaults({ noCors: false });
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(cors());

// Custom middleware to modify the response
server.use((req, res, next) => {
  if (req.path === '/explore') {
    const data = router.db.get('explore').value(); // Get all data from 'explore' key
    const randomizedData = shuffleArray(data).slice(0, 10); // Randomize and limit to 5 items
    res.json(randomizedData);
  } else {
    next(); // Pass control to the next middleware
  }
});

server.use(router);

server.listen(port);

// Function to shuffle an array randomly (Fisher-Yates algorithm)
function shuffleArray(array) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}
