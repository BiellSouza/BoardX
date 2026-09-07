import logoMobile from "../assets/logoMobilepng.png";
import logoDesktop from "../assets/logoDesktopLight.png";
import imgLogin from "../assets/imgLogin.png";
import svgGoogle from "../../public/svgs/google.svg";
import svgGithub from "../../public/svgs/github.svg";
import {
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

function Login() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
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
            <div key={index} className="flex items-center gap-2">
              <div className="text-light p-1 rounded-md bg-primary">
                {item.icon}
              </div>
              <p className="text-sm text-secondary">{item.label}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="px-6 lg:flex lg:flex-col lg:m-auto">
        <img
          className="m-auto lg:hidden"
          src={logoMobile}
          alt="Brasão da logo do boardX"
        />
        <div className="mt-6 text-center">
          <h1 className="text-lg font-medium sm:text-xl lg:text-2xl">
            Bem-vindo de volta! 👋
          </h1>
          <p className="text-xs text-secondary sm:text-[14px] lg:text-[16px]">
            Faça login para continuar no boardX
          </p>
        </div>

        <div className="flex flex-col gap-2 mt-6 items-center max-w-100 mx-auto">
          <button className="flex items-center gap-2 border border-gray-300 py-2 w-full justify-center rounded-md text-xs text-secondary sm:max-w-100 sm:py-3 lg:w-100">
            <img className="w-4" src={svgGoogle} alt="Logo do Google" /> Entrar
            com Google
          </button>
          <button className="flex items-center gap-2 border border-gray-300 py-2 w-full justify-center rounded-md text-xs text-secondary sm:max-w-100 sm:py-3 lg:w-100">
            {" "}
            <img className="w-4" src={svgGithub} alt="Logo do Google" /> Entrar
            com Github
          </button>

          <p className="text-secondary text-xs mt-6 text-center sm:mt-4 items-center gap-3 justify-center opacity-70 hidden lg:flex">
            <span>
              <Lock className="size-3 text-secondary" />
            </span>{" "}
            Seus dados estão protegidos com segurança
          </p>
        </div>

        <div className="flex justify-between text-xs text-secondary gap-2 items-center my-6 max-w-100 mx-auto sm:max-w-82 sm:mx-auto lg:min-w-full lg:mx-0">
          <hr className="w-[40%] lg:w-full opacity-40" />
          <p className="w-full text-center lg:whitespace-nowrap">
            ou continue com email
          </p>
          <hr className="w-[40%] lg:w-full opacity-40" />
        </div>

        <div className="flex flex-col gap-3 max-w-100 mx-auto sm:max-w-100 sm:mx-auto lg:min-w-full">
          <div className="flex flex-col">
            <label htmlFor="" className="text-xs text-secondary">
              E-mail
            </label>
            <div className="flex items-center gap-2 border border-gray-300 px-2 h-9 rounded-md">
              <Mail className="size-4 text-secondary" />
              <input
                type="email"
                placeholder="seu@email.com"
                className=" outline-none text-sm text-secondary"
              />
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="" className="text-xs text-secondary">
              Senha
            </label>
            <div className="flex items-center justify-between gap-2 border border-gray-300 px-2 h-9 rounded-md">
              <div className="flex items-center gap-2">
                {" "}
                <User className="size-4 text-secondary" />
                <input
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="•••••••"
                  className=" outline-none text-sm text-secondary"
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
          <div className="flex items-center gap-2">
            <input type="checkbox" className="accent-primary" />
            <p className="text-xs text-secondary">Lembrar de mim</p>
          </div>
          <a className="text-xs text-primary" href="">
            Esqueceu sua senha?
          </a>
        </div>

        <button className="flex justify-center w-full bg-primary max-w-100 mx-auto text-light rounded-md h-8 items-center text-xs sm:max-w-100 sm:mx-auto">
          Entrar
        </button>

        <p className="text-secondary text-xs mt-6 text-center sm:mt-10 lg:mt-6">
          Ainda não tem uma conta?{" "}
          <a className="text-primary" href="">
            Criar conta
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
