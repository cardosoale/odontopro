{ pkgs, ... }: {
  # Canal unstable para garantir Node.js 22.12+ para o Prisma 7
  channel = "unstable";

  packages = [
    pkgs.nodejs_22
    pkgs.openssl       # Remove os avisos de libssl do Prisma
    pkgs.setxkbmap     # Ferramenta de configuração de teclado
    pkgs.glibcLocales  # Suporte a caracteres pt-BR e acentuação
  ];

  # Variáveis de ambiente para o sistema entender o idioma Português
  env = {
    LANG = "pt_BR.UTF-8";
    LC_ALL = "pt_BR.UTF-8";
  };

  idx.extensions = [
    "Prisma.prisma"
  ];

  idx.previews = {
    enable = true;
    previews = {
      # Mantém o seu preview Web atual
      web = {
        command = [
          "npm"
          "run"
          "dev"
          "--"
          "--port"
          "$PORT"
          "--hostname"
          "0.0.0.0"
        ];
        manager = "web";
      };
      # Adiciona a emulação de Android
      android = {
        manager = "android";
      };
    };
  };

  idx.workspace = {
    # Executa apenas uma vez na criação do workspace
    onCreate = {
      npm-install = "npm install && npx prisma generate";
    };
    # Executa toda vez que o workspace é reiniciado ou rebuildado
    onStart = {
      # Garante que o Prisma Client esteja sempre pronto e limpa possíveis travas
      setup = "npx prisma generate";
    };
  };
}
