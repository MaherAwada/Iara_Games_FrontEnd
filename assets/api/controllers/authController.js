exports.login = (req, res) => {
    const { email, password } = req.body;
  
    // Simulando banco de dados
    const mockUser = {
      email: "teste@iaragames.com",
      password: "123456",
    };
  
    if (email === mockUser.email && password === mockUser.password) {
      return res.status(200).json({ message: "Login bem-sucedido!", token: "123456abc" });
    } else {
      return res.status(401).json({ message: "E-mail ou senha inválidos!" });
    }
  };
  