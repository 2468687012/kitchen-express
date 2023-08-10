const jsonServer = require("json-server");

const server = jsonServer.create();

const usersRoutes = jsonServer.router("users.json");


const middlewares = jsonServer.defaults();
const port = process.env.PORT || 3000;

server.use(middlewares);
server.use(jsonServer.bodyParser);

// 创建一个 Map 存储 token 和时间戳
let tokensMap = new Map();

server.use((req, res, next) => {
  if (req.path === "/login" && req.method === "POST") {
    next();
    return;
  }

  const token = req.headers["authorization"];

  // 在服务器上检查token是否存在，并且没有过期
  if (!token || !tokensMap.has(token)) {
    return res.sendStatus(401);
  }

  const timestamp = tokensMap.get(token);
  const currentTime = Date.now();

  // 如果token已经过期（我们设置为1小时过期），则删除token并返回402
  if (currentTime - timestamp > 60 * 60 * 1000) {
    tokensMap.delete(token);
    return res.sendStatus(402);
  }

  // 更新 token 的时间戳
  tokensMap.set(token, currentTime);

  next();
});

server.post("/login", (req, res) => {
  const { username, password } = req.body;

  const db = usersRoutes.db;
  const user = db.get("user").find({ username, password }).value();

  if (!username || !password || !user) {
    return res.status(400).send({ error: "Bad credentials" });
  }

  // 使用当前时间作为 token
  const token = Date.now().toString();
  tokensMap.set(token, Date.now());

  return res.status(200).send({ user, token });
});

server.use(usersRoutes);

server.listen(port, () => {
  console.log(`JSON Server is running on port ${port}`);
});