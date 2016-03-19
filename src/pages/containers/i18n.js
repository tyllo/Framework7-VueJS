var en = {
  types: {
    title: 'Type',
    FL: 'Without Walls',
    HC: 'High',
    HR: 'High Reefer',
    OP: 'Without a roof',
    RF: 'Reefer',
    ST: 'Standard',
    TK: 'Tank, izotank',
    TM: 'Thermos',
  },

  load: {
    title: 'Loading',
    false: 'Empty',
    true: 'Full',
  },

  sizes: {
    title: 'Size',
    3: '3T',
    5: '5T',
    10: '10T',
    20: '20ft',
    40: '40ft',
    45: '45ft',
  },

  sortList: {
    date_in: 'By date arrival',
    date_out: 'By date Expense',
    number: 'By number',
    type: 'By type',
    load: 'By loading',
    size: 'By size',
    transport: 'By transport',
    kontr: 'By contractor',
    konos: 'By lading',
  },

  operations: {
    weighing: 'Weighing',
    nomination: 'Nomination',
    disinfection: 'Disinfection',
    inspection: 'Inspection',
    stuffing: 'Stuffing',
    lathing: 'Lathing',
    MIDK: 'MIDK',
    disconnection: 'Disconnection',
    delivery: 'Delivery',
    seal: 'Seal',
    connection: 'Connection',
    arrival: 'Arrival',
    washing: 'Washing',
    unstuffing: 'Unstuffing',
    expense: 'Expense',
    supply: 'Supply',
  },

  title: {
    main: 'Contaners',
    info: 'Transactions made with the container',
    infoEmpty: 'not made',
    bills: 'Billings container',
    billsEmpty: 'not billed',
  },

  header: 'Container {number}',

  PIK: 'PIK',
  VSCT: 'VSCT',
  arrival: 'Coming',
  expense: 'Consumption',
  transport: 'Transport',
  kontr: 'Contractor',
  konos: 'Lading',
  empty: {
    containers: 'During the period from <b>{0}</b> at <b>{1}</b> operations with containers not made',
    dates: 'Choose the date',
  },

  more: 'MORE ABOUT CONTAINER',
}

var ru = {
  types: {
    title: 'Тип',
    FL: 'Без стен',
    HC: 'Высокий',
    HR: 'Высокий Рефрижераторный',
    OP: 'Без крыши',
    RF: 'Рефрижераторный',
    ST: 'Стандартный',
    TK: 'Цистерна, изотанк',
    TM: 'Термос',
  },

  load: {
    title: 'Загрузка',
    false: 'Пустой',
    true: 'Полный',
  },

  sizes: {
    title: 'Размер',
    3: '3T',
    5: '5T',
    10: '10T',
    20: '20ft',
    40: '40ft',
    45: '45ft',
  },

  sortList: {
    date_in: 'По дате прихода',
    date_out: 'По дате Расхода',
    number: 'По номеру',
    type: 'По типу',
    load: 'По загрузке',
    size: 'По размеру',
    transport: 'По транспорту',
    kontr: 'По контрагенту',
    konos: 'По консаменту',
  },

  operations: {
    weighing: 'Взвешивание',          // Взв
    nomination: 'Выставление',        // Выст
    disinfection: 'Дезинфекция',      // ДЗФ
    inspection: 'Досмотр',            // Досм
    stuffing: 'Затарка',              // ЗТар
    lathing: 'Крепление обрусовка',   // КрОб
    MIDK: 'МИДК',                     // МИДК
    disconnection: 'Отключение',      // Откл
    delivery: 'Передача контейнеров', // ПК
    seal: 'Пломбирование',            // Плмб
    connection: 'Подключение',        // Пдкл
    arrival: 'Приход',                // Прих
    washing: 'Промывка',              // ПРМ
    unstuffing: 'Растарка',           // РТар
    expense: 'Расход',                // Расх
    supply: 'Снабжение',              // СН
  },

  header: 'Контейнер {number}',

  title: {
    main: 'Контейнеры',
    info: 'Операции, произведенные с контейнером',
    infoEmpty: 'не производились',
    bills: 'Выставленные счета для контейнера',
    billsEmpty: 'счета не выставлялись',
  },

  PIK: 'ПИК',
  VSCT: 'ВМКТ',
  arrival: 'Приход',
  expense: 'Расход',
  transport: 'Транспорт',
  kontr: 'Контрагент',
  konos: 'Коносамент',
  empty: {
    containers: 'За период с <b>{0}</b> по <b>{1}</b> операций с контейнерами не производились',
    dates: 'Выбирите даты',
  },
  more: 'ПОДРОБНЕЙ О КОНТЕЙНЕРЕ',
}

export default { en, ru }
