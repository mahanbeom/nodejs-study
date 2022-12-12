const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const users = [
	{ id: 1, name: "user1" },
	{ id: 2, name: "user2" },
	{ id: 3, name: "user3" }
];

app.get("/", (req, res) => {
	res.send("Hello World");
});

app.get("/api/users", (req, res) => {
	res.json({ ok: true, users: users});
});

// Request query
app.get("/api/users/user", (req, res) => {
	const user_id = req.query.user_id;

	const user = users.filter(data => data.id == user_id);

	res.json({ ok: true, user: user });
});

// Request body
app.get("/api/users/userBody", (req, res) => {
	const user_id = req.body.user_id;

	const user = users.filter(data => data.id == user_id);

	res.json({ ok: true, user: user });
});

// Request params
app.get("/api/users/:user_id", (req, res) => {
	const user_id = req.params.user_id;

	const user = users.filter(data => data.id == user_id);

	res.json({ ok: true, user: user });
});

// Create user
app.post("/api/users", (req, res) => {
	const { id, name } = req.body;
	const user = users.concat({id, name});

	res.json({ ok: true, users: user });
});

// Update users
app.put("/api/users", (req, res) => {
	const { id, name } = req.body;
	const edit_user = users.find(data => data.id == id);
	if (!edit_user) return res.json({ ok: false, user: "user does not exist."});

	const user = users.map(data => {
		if(data.id == id) data.name = name;
		return {
			id: data.id,
			name: data.name
		}
	});

	res.json({ ok: true, users: user });
});

// Update user
app.patch("/api/users/:user_id", (req, res) => {
	const user_id = req.params.user_id;
	const name = req.body.name;
	const edit_user = users.find(data => data.id == user_id);
	if (!edit_user) return res.json({ ok: false, user: "user does not exist."});

	const user = users.map(data => {
		if(data.id == user_id) data.name = name;
		return { id: data.id, name: data.name };
	});

	res.json({ ok: true, user: user });
});

// Delete user
app.delete("/api/users/:user_id", (req, res) => {
	const user_id = req.params.user_id;
	const user = users.filter(data => data.id != user_id);

	res.json({ ok: true, users: user });
});

app.listen(3001, () => console.log("nodejs test"));