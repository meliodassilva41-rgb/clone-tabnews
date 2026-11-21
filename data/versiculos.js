// Versículos na tradução João Ferreira de Almeida.
// Para adicionar um novo, basta colocar mais um item na lista.
const versiculos = [
  // Amor
  {
    texto:
      "Porque Deus amou o mundo de tal maneira que deu o seu Filho unigênito, para que todo aquele que nele crê não pereça, mas tenha a vida eterna.",
    referencia: "João 3:16",
    tema: "Amor",
  },
  {
    texto:
      "O amor é sofredor, é benigno; o amor não é invejoso; o amor não trata com leviandade, não se ensoberbece.",
    referencia: "1 Coríntios 13:4",
    tema: "Amor",
  },
  {
    texto: "Aquele que não ama não conhece a Deus, porque Deus é amor.",
    referencia: "1 João 4:8",
    tema: "Amor",
  },
  {
    texto:
      "Porque estou certo de que nem a morte, nem a vida, nem os anjos, nem os principados, nem as potestades, nem o presente, nem o porvir, nem a altura, nem a profundidade, nem alguma outra criatura nos poderá separar do amor de Deus, que está em Cristo Jesus, nosso Senhor.",
    referencia: "Romanos 8:38-39",
    tema: "Amor",
  },
  {
    texto:
      "Agora, pois, permanecem a fé, a esperança e o amor, estes três; mas o maior destes é o amor.",
    referencia: "1 Coríntios 13:13",
    tema: "Amor",
  },
  {
    texto:
      "Mas Deus prova o seu amor para conosco em que Cristo morreu por nós, sendo nós ainda pecadores.",
    referencia: "Romanos 5:8",
    tema: "Amor",
  },
  {
    texto: "No amor não há temor; antes, o perfeito amor lança fora o temor.",
    referencia: "1 João 4:18",
    tema: "Amor",
  },

  // Fé
  {
    texto:
      "Ora, a fé é o firme fundamento das coisas que se esperam e a prova das coisas que se não veem.",
    referencia: "Hebreus 11:1",
    tema: "Fé",
  },
  {
    texto: "Se tu podes crer, tudo é possível ao que crê.",
    referencia: "Marcos 9:23",
    tema: "Fé",
  },
  {
    texto:
      "Confia no Senhor de todo o teu coração e não te estribes no teu próprio entendimento. Reconhece-o em todos os teus caminhos, e ele endireitará as tuas veredas.",
    referencia: "Provérbios 3:5-6",
    tema: "Fé",
  },
  {
    texto: "De sorte que a fé é pelo ouvir, e o ouvir pela palavra de Deus.",
    referencia: "Romanos 10:17",
    tema: "Fé",
  },
  {
    texto:
      "Ora, sem fé é impossível agradar-lhe, porque é necessário que aquele que se aproxima de Deus creia que ele existe e que é galardoador dos que o buscam.",
    referencia: "Hebreus 11:6",
    tema: "Fé",
  },
  {
    texto: "Porque andamos por fé e não por vista.",
    referencia: "2 Coríntios 5:7",
    tema: "Fé",
  },

  // Esperança
  {
    texto:
      "Porque eu bem sei os pensamentos que penso de vós, diz o Senhor; pensamentos de paz e não de mal, para vos dar o fim que esperais.",
    referencia: "Jeremias 29:11",
    tema: "Esperança",
  },
  {
    texto:
      "Ora, o Deus de esperança vos encha de todo o gozo e paz em crença, para que abundeis em esperança pela virtude do Espírito Santo.",
    referencia: "Romanos 15:13",
    tema: "Esperança",
  },
  {
    texto:
      "As misericórdias do Senhor são a causa de não sermos consumidos, porque as suas misericórdias não têm fim. Novas são cada manhã; grande é a tua fidelidade.",
    referencia: "Lamentações 3:22-23",
    tema: "Esperança",
  },
  {
    texto:
      "E sabemos que todas as coisas contribuem juntamente para o bem daqueles que amam a Deus, daqueles que são chamados por seu decreto.",
    referencia: "Romanos 8:28",
    tema: "Esperança",
  },
  {
    texto: "O choro pode durar uma noite, mas a alegria vem pela manhã.",
    referencia: "Salmos 30:5",
    tema: "Esperança",
  },
  {
    texto:
      "E Deus limpará de seus olhos toda lágrima, e não haverá mais morte, nem pranto, nem clamor, nem dor, porque já as primeiras coisas são passadas.",
    referencia: "Apocalipse 21:4",
    tema: "Esperança",
  },

  // Força
  {
    texto: "Posso todas as coisas naquele que me fortalece.",
    referencia: "Filipenses 4:13",
    tema: "Força",
  },
  {
    texto:
      "Não to mandei eu? Esforça-te e tem bom ânimo; não temas, nem te espantes, porque o Senhor, teu Deus, é contigo por onde quer que andares.",
    referencia: "Josué 1:9",
    tema: "Força",
  },
  {
    texto:
      "Não temas, porque eu sou contigo; não te assombres, porque eu sou teu Deus; eu te esforço, e te ajudo, e te sustento com a destra da minha justiça.",
    referencia: "Isaías 41:10",
    tema: "Força",
  },
  {
    texto:
      "Mas os que esperam no Senhor renovarão as suas forças, subirão com asas como águias; correrão e não se cansarão; caminharão e não se fatigarão.",
    referencia: "Isaías 40:31",
    tema: "Força",
  },
  {
    texto:
      "Deus é o nosso refúgio e fortaleza, socorro bem presente na angústia.",
    referencia: "Salmos 46:1",
    tema: "Força",
  },
  {
    texto:
      "A minha graça te basta, porque o meu poder se aperfeiçoa na fraqueza.",
    referencia: "2 Coríntios 12:9",
    tema: "Força",
  },
  {
    texto:
      "O Senhor é a minha luz e a minha salvação; a quem temerei? O Senhor é a força da minha vida; de quem me recearei?",
    referencia: "Salmos 27:1",
    tema: "Força",
  },

  // Paz
  {
    texto:
      "Deixo-vos a paz, a minha paz vos dou; não vo-la dou como o mundo a dá. Não se turbe o vosso coração, nem se atemorize.",
    referencia: "João 14:27",
    tema: "Paz",
  },
  {
    texto:
      "Não estejais inquietos por coisa alguma; antes, as vossas petições sejam em tudo conhecidas diante de Deus, pela oração e súplica, com ação de graças. E a paz de Deus, que excede todo o entendimento, guardará o vosso coração e os vossos sentimentos em Cristo Jesus.",
    referencia: "Filipenses 4:6-7",
    tema: "Paz",
  },
  {
    texto:
      "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    referencia: "Mateus 11:28",
    tema: "Paz",
  },
  {
    texto:
      "O Senhor é o meu pastor; nada me faltará. Deitar-me faz em verdes pastos, guia-me mansamente a águas tranquilas.",
    referencia: "Salmos 23:1-2",
    tema: "Paz",
  },
  {
    texto:
      "Lançando sobre ele toda a vossa ansiedade, porque ele tem cuidado de vós.",
    referencia: "1 Pedro 5:7",
    tema: "Paz",
  },
  {
    texto:
      "Tu conservarás em paz aquele cuja mente está firme em ti; porque ele confia em ti.",
    referencia: "Isaías 26:3",
    tema: "Paz",
  },
  {
    texto:
      "Em paz também me deitarei e dormirei, porque só tu, Senhor, me fazes habitar em segurança.",
    referencia: "Salmos 4:8",
    tema: "Paz",
  },

  // Sabedoria
  {
    texto:
      "E, se algum de vós tem falta de sabedoria, peça-a a Deus, que a todos dá liberalmente e o não lança em rosto; e ser-lhe-á dada.",
    referencia: "Tiago 1:5",
    tema: "Sabedoria",
  },
  {
    texto:
      "O temor do Senhor é o princípio da sabedoria, e a ciência do Santo, a prudência.",
    referencia: "Provérbios 9:10",
    tema: "Sabedoria",
  },
  {
    texto: "Lâmpada para os meus pés é tua palavra e luz, para o meu caminho.",
    referencia: "Salmos 119:105",
    tema: "Sabedoria",
  },
  {
    texto:
      "Mas buscai primeiro o Reino de Deus, e a sua justiça, e todas essas coisas vos serão acrescentadas.",
    referencia: "Mateus 6:33",
    tema: "Sabedoria",
  },
  {
    texto:
      "Ensina-nos a contar os nossos dias, de tal maneira que alcancemos coração sábio.",
    referencia: "Salmos 90:12",
    tema: "Sabedoria",
  },
  {
    texto:
      "Confia ao Senhor as tuas obras, e teus pensamentos serão estabelecidos.",
    referencia: "Provérbios 16:3",
    tema: "Sabedoria",
  },

  // Gratidão
  {
    texto:
      "Em tudo dai graças, porque esta é a vontade de Deus em Cristo Jesus para convosco.",
    referencia: "1 Tessalonicenses 5:18",
    tema: "Gratidão",
  },
  {
    texto: "Este é o dia que fez o Senhor; regozijemo-nos e alegremo-nos nele.",
    referencia: "Salmos 118:24",
    tema: "Gratidão",
  },
  {
    texto:
      "Louvai ao Senhor, porque ele é bom; porque a sua benignidade é para sempre.",
    referencia: "Salmos 136:1",
    tema: "Gratidão",
  },
  {
    texto:
      "Entrai pelas portas dele com louvor e em seus átrios, com hino; louvai-o e bendizei o seu nome.",
    referencia: "Salmos 100:4",
    tema: "Gratidão",
  },
];

export default versiculos;
