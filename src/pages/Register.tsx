import logoMobile from "../assets/logoMobilepng.png";
import logoDesktop from "../assets/logoDesktopLight.png";
import imgLogin from "../assets/imgLogin.png";
import svgGoogle from "../../public/svgs/google.svg";
import svgGithub from "../../public/svgs/github.svg";
import {
  ArrowLeft,
  Eye,
  EyeOff,
  Grid2X2,
  Lock,
  Mail,
  Shield,
  User,
  Users,
} from "lucide-react";
import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const topics = [
    {
      icon: <Grid2X2 className="size-5" />,
      label: "Quadros ilimitados",
    },
    {
      icon: <Users className="size-5" />,
      label: "Colaborações em tempo real",
    },
    {
      icon: <Shield className="size-5" />,
      label: "Seus dado sempre salvos",
    },
  ];

  const navigate = useNavigate();

  async function handleRegister() {
    if (password !== confirmPassword) {
      alert("As duas senhas devem ser iguais!");
      setPassword("");
      setConfirmPassword("");
      return;
    }

    if (privacy === false) {
      alert("Aceite os Termos de Uso e Política de Privacidade");
      return;
    }

    console.log("NAME:", name);
    console.log("EMAIL:", email);
    console.log("PASSWORD:", password);
    console.log("CONFIRM PASSWORD:", confirmPassword);

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        data: {
          name: name,
          confirmPassword: confirmPassword,
        },
      },
    });

    console.log("DATA:", data);
    console.log("ERROR:", error);

    if (error) {
      alert(error.message);
      return;
    }

    alert("Parabéns, sua conta foi criada!");
    navigate("/dashboard");
  }

  return (
    <div className="font-primary flex flex-col h-screen justify-center lg:flex-row lg:justify-between">
      <div className="w-sm h-screen bg-dark p-6 justify-between hidden lg:flex lg:flex-col">
        <img src={logoDesktop} alt="logo do BoardX" className="max-w-54" />

        <div className="mt-18">
          <h1 className="text-light font-bold text-5xl leading-14">
            Organize, <br />
            Planeje, <br />
            <span className="text-primary"> Conquiste.</span>
          </h1>
          <p className="text-secondary mt-6 max-w-72">
            A plataforma completa para gerenciar seus projetos e tarefas com
            eficiência.
          </p>
        </div>

        <div>
          <img
            src={imgLogin}
            alt="imagem ilustrativa de plataforma"
            className="w-full mt-6 max-w-[380px]"
          />
        </div>

        <div className="flex flex-col gap-4 mt-6">
          {topics.map((item, index) => (
            <div key={index} className="flex items-center gap-2 w-full">
              <div className="text-light p-1 rounded-md bg-primary">
                {item.icon}
              </div>
              <p className="text-sm text-secondary">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 lg:flex lg:flex-col lg:m-auto lg:max-w-114">
        <div className="max-w-100 flex justify-start m-auto lg:hidden">
          <button>
            {" "}
            <ArrowLeft className="size-6" />
          </button>
        </div>
        <img
          className="m-auto lg:hidden mt-4"
          src={logoMobile}
          alt="Brasão da logo do boardX"
        />
        <div className="mt-6 text-center">
          <h1 className="text-lg font-medium sm:text-xl lg:text-2xl">
            Criar sua conta
          </h1>
          <p className="text-xs text-secondary sm:text-[14px] lg:text-[16px]">
            Preencha os dados abaixo
          </p>
        </div>

        <div className="flex flex-col gap-3 max-w-100 mx-auto sm:max-w-100 lg:min-w-full mt-4">
          <div className="flex flex-col">
            <label htmlFor="" className="text-xs text-secondary">
              Nome completo
            </label>
            <div className="flex items-center gap-2 w-full border border-gray-300 px-2 h-9 rounded-md">
              <User className="size-4 text-secondary" />
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                type="text"
                placeholder="Seu nome"
                className="w-full outline-none text-sm text-secondary"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="text-xs text-secondary">
              E-mail
            </label>
            <div className="flex items-center gap-2 w-full border border-gray-300 px-2 h-9 rounded-md">
              <Mail className="size-4 text-secondary" />
              <input
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                type="email"
                placeholder="seu@email.com"
                className="w-full outline-none text-sm text-secondary"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="text-xs text-secondary">
              Senha
            </label>
            <div className="flex items-center justify-between gap-2 border border-gray-300 px-2 h-9 rounded-md">
              <div className="flex items-center gap-2 w-full">
                {" "}
                <User className="size-4 text-secondary" />
                <input
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Mínimo de 6 caracteres"
                  className="w-full outline-none text-sm text-secondary"
                />
              </div>
              <button onClick={() => setMostrarSenha(!mostrarSenha)}>
                {mostrarSenha ? (
                  <EyeOff className="text-secondary size-5" />
                ) : (
                  <Eye className="text-secondary size-5" />
                )}
              </button>
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="text-xs text-secondary">
              Confirmar senha{" "}
            </label>
            <div className="flex items-center justify-between gap-2 border border-gray-300 px-2 h-9 rounded-md">
              <div className="flex items-center gap-2 w-full">
                {" "}
                <User className="size-4 text-secondary" />
                <input
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Confirmar sua senha"
                  className="w-full outline-none text-sm text-secondary"
                />
              </div>
              <button onClick={() => setMostrarSenha(!mostrarSenha)}>
                {mostrarSenha ? (
                  <EyeOff className="text-secondary size-5" />
                ) : (
                  <Eye className="text-secondary size-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between my-4 max-w-100 mx-auto sm:max-w-100 sm:mx-auto lg:min-w-full lg:my-6">
          <div className="flex items-center gap-2 w-full">
            <input
              type="checkbox"
              className="accent-primary"
              onChange={(event) => setPrivacy(event.target.checked)}
            />
            <p className="text-xs text-secondary">
              Eu concordo com os{" "}
              <a className="text-xs text-primary" href="">
                Termos de Uso <span className="text-secondary"> e </span>{" "}
                Política de Privacidade
              </a>
            </p>{" "}
          </div>
        </div>

        <button
          onClick={handleRegister}
          className="scale-100 hover:scale-95 duration-300 transition-all cursor-pointer max-w-100 mx-auto flex justify-center w-full bg-primary text-light rounded-md h-8 items-center text-xs sm:max-w-100 sm:mx-auto"
        >
          Criar conta
        </button>

        <div className="flex justify-between max-w-100 mx-auto text-xs text-secondary gap-2 items-center my-6 sm:max-w-82 sm:mx-auto lg:min-w-full lg:mx-0">
          <hr className="w-[40%] lg:w-full opacity-40" />
          <p className="w-full text-center lg:whitespace-nowrap">
            ou cadastre-se com{" "}
          </p>
          <hr className="w-[40%] lg:w-full opacity-40" />
        </div>

        <div className="flex flex-row gap-2 mt-6 items-center justify-center lg:flex-col lg:mt-0">
          <div className="flex gap-2">
            <button
              disabled
              className="cursor-not-allowed opacity-50 flex items-center gap-2 lg:w-24 border border-gray-300 py-2 w-24 justify-center rounded-md text-xs text-secondary sm:max-w-100 sm:py-3 scale-100 hover:scale-95 duration-300 transition-all"
            >
              <img className="w-4" src={svgGoogle} alt="Logo do Google" />
            </button>
            <button
              onClick={async () => {
                const { data, error } = await supabase.auth.signInWithOAuth({
                  provider: "github",
                  options: {
                    redirectTo: "http://localhost:5173/dashboard",
                  },
                });

                console.log("DATA:", data);
                console.log("ERROR:", error);
              }}
              className="cursor-pointer flex items-center gap-2 lg:w-24 border border-gray-300 py-2 w-24 justify-center rounded-md text-xs text-secondary sm:max-w-100 sm:py-3"
            >
              {" "}
              <img className="w-4" src={svgGithub} alt="Logo do Google" />
            </button>
          </div>

          <p className="text-secondary text-xs mt-6 text-center sm:mt-4 items-center gap-3 justify-center opacity-70 hidden lg:flex">
            <span>
              <Lock className="size-3 text-secondary" />
            </span>{" "}
            Seus dados estão protegidos com segurança
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
