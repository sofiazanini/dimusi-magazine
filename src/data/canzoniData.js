// canzoni personali dell'archivio
export const mieCanzoniIniziali = [
  {
    id: 1,
    titolo: 'BIRDS OF A FEATHER',
    artista: 'Billie Eilish',
    cover: 'https://i.scdn.co/image/ab67616d0000b27371d62ea7ea8a5be92d3c1f62',
    archetipo: 'Catartico',
    volume: 'Vol. 01',
    autore: 'Sofia Zanini',
    isMine: true,
    data: '20/08/2026',
    arkelo: 'Correre su una scogliera al tramonto mentre la luce scompare nel mare. Senso di liberazione totale.'
  },
  {
    id: 2,
    titolo: 'As It Was',
    artista: 'Harry Styles',
    cover: 'https://i.scdn.co/image/ab67616d0000b2732e8f6fb74623f3775a00464d',
    archetipo: 'Apollineo',
    volume: 'Vol. 01',
    autore: 'Sofia Zanini',
    isMine: true,
    data: '18/08/2026',
    arkelo: 'Camminare a ritmo veloce in una stanza vuota e luminosa. Accettazione del cambiamento.'
  },
  {
    id: 3,
    titolo: 'See You Again',
    artista: 'Tyler, The Creator, Kali Uchis',
    cover: 'https://i.scdn.co/image/ab67616d0000b2738940ac99f49e44f59e6f7fb3',
    archetipo: 'Ibrido',
    volume: 'Vol. 01',
    autore: 'Sofia Zanini',
    isMine: true,
    data: '14/08/2026',
    arkelo: 'Un sogno a occhi aperti dentro un auto ferma sotto il sole estivo. Sospensione temporale.'
  }
]

// utenti seguiti con cover ufficiali
export const utentiSeguitiIniziali = [
  {
    nome: 'Erick M.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&auto=format&fit=crop&q=80',
    bio: 'Graphic designer e collezionista di suoni ipnotici e synth notturni.',
    canzoniComuni: 2,
    canzoni: [
      {
        id: 101,
        titolo: 'The Less I Know The Better',
        artista: 'Tame Impala',
        cover: 'https://i.scdn.co/image/ab67616d0000b2739e1cde7ef08d0303b83e8675',
        archetipo: 'Dionisiaco',
        volume: 'Vol. 01',
        autore: 'Erick M.',
        isMine: false,
        arkelo: 'Pista da ballo con luci stroboscopiche rosse che deformano i volti.'
      },
      {
        id: 102,
        titolo: 'Blinding Lights',
        artista: 'The Weeknd',
        cover: 'https://i.scdn.co/image/ab67616d0000b2738863bc11d2aa12b54f5aeb36',
        archetipo: 'Dionisiaco',
        volume: 'Vol. 01',
        autore: 'Erick M.',
        isMine: false,
        arkelo: 'Corsa in auto in una galleria sotterranea mentre le luci scorrono veloci.'
      }
    ]
  },
  {
    nome: 'Silvia G.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&auto=format&fit=crop&q=80',
    bio: 'Archivio brani legati alla terra, radici folk e chitarre acustiche.',
    canzoniComuni: 1,
    canzoni: [
      {
        id: 104,
        titolo: 'Levitating',
        artista: 'Dua Lipa',
        cover: 'https://i.scdn.co/image/ab67616d0000b273bd26ede1ae69327010d49946',
        archetipo: 'Apollineo',
        volume: 'Vol. 01',
        autore: 'Silvia G.',
        isMine: false,
        arkelo: 'Un cielo stellato sopra una festa estiva all aperto. Energia pura.'
      },
      {
        id: 105,
        titolo: 'Starboy',
        artista: 'The Weeknd, Daft Punk',
        cover: 'https://i.scdn.co/image/ab67616d0000b2734718e2b124f79258be7bc452',
        archetipo: 'Dionisiaco',
        volume: 'Vol. 01',
        autore: 'Silvia G.',
        isMine: false,
        arkelo: 'Neon blu e rossi riflessi sul parabrezza di notte.'
      }
    ]
  }
]

// 5 brani consigliati con cover ufficiali corrette
export const canzoniConsigliateIniziali = [
  {
    id: 201,
    titolo: 'Cruel Summer',
    artista: 'Taylor Swift',
    cover: 'https://i.scdn.co/image/ab67616d0000b273e787cffec20aa2a396a61647',
    archetipo: 'Catartico',
    volume: 'Vol. 01',
    autore: 'Suggerito da Dimusi',
    isMine: false,
    motivoConsiglio: 'Esplosione emotiva e ritornello liberatorio estivo.',
    amicoCheHaSalvat: 'Silvia G.',
    arkelo: 'Guidare con i finestrini abbassati durante la prima sera d estate.'
  },
  {
    id: 202,
    titolo: 'Sweater Weather',
    artista: 'The Neighbourhood',
    cover: 'https://i.scdn.co/image/ab67616d0000b2738265a736a1eb838ad5a0b921',
    archetipo: 'Ibrido',
    volume: 'Vol. 01',
    autore: 'Suggerito da Dimusi',
    isMine: false,
    motivoConsiglio: 'Atmosfere intime in bianco e nero e nostalgia rassicurante.',
    amicoCheHaSalvat: 'Erick M.',
    arkelo: 'La brezza fredda di ottobre in riva al mare deserto.'
  },
  {
    id: 203,
    titolo: 'Watermelon Sugar',
    artista: 'Harry Styles',
    cover: 'https://i.scdn.co/image/ab67616d0000b27377fdcfda6535601aff081b6a',
    archetipo: 'Apollineo',
    volume: 'Nessuno',
    autore: 'Suggerito da Dimusi',
    isMine: false,
    motivoConsiglio: 'Luminosità ed euforia solare in sintonia con le tue playlist.',
    amicoCheHaSalvat: 'Sofia Z.',
    arkelo: 'Una spiaggia assolata con amici e risate al tramonto.'
  },
  {
    id: 204,
    titolo: 'Espresso',
    artista: 'Sabrina Carpenter',
    cover: 'https://i.scdn.co/image/ab67616d0000b273fd8d7a8d96871e791cb1f628',
    archetipo: 'Apollineo',
    volume: 'Vol. 01',
    autore: 'Suggerito da Dimusi',
    isMine: false,
    motivoConsiglio: 'Ritmo contagioso, leggero ed estivo.',
    amicoCheHaSalvat: 'Silvia G.',
    arkelo: 'Un pomeriggio d agosto con un caffe freddo vista mare.'
  },
  {
    id: 205,
    titolo: 'Summertime Sadness',
    artista: 'Lana Del Rey',
    cover: 'https://i.scdn.co/image/ab67616d0000b273b4007f300c7e2b7f73bb774d',
    archetipo: 'Dionisiaco',
    volume: 'Vol. 01',
    autore: 'Suggerito da Dimusi',
    isMine: false,
    motivoConsiglio: 'Fascino cinematografico vintage e nostalgia dolce.',
    amicoCheHaSalvat: 'Erick M.',
    arkelo: 'La luce dorata di fine estate che allunga le ombre sull asfalto.'
  }
]