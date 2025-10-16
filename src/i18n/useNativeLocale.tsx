'use client'

import { useLocale } from 'next-intl'

const translations = {
  ru: {
    search: 'Поиск...',
    login: 'Войти',
    selectFile: 'Прикрепите файлы',
    getActionUser: {
      titleArticle: 'Поделитесь своими мыслями и исследованиями об урбанистике',
      buttonArticle: 'Добавить статью',
      titleIdea: 'Поделитесь своими идеями улучшения условий для горожан',
      buttonIdea: 'Добавить идею',
    },
    profile: {
      profile: 'Мой профиль',
      articles: 'Мои статьи',
      notArticles: 'У вас пока нет опубликованных статей.',
      ideas: 'Мои идеи',
      noIdeas: 'У вас пока нет опубликованных идей.',
    },
    navBar: [
      'Банк Урбан-идей',
      'Урбан-статьи',
      'Краудфандинг',
      'Краудсорсинг',
      'О нас',
    ],
    dropdown: [
      { label: 'Новые', value: 'new' },
      { label: 'Популярные', value: 'popular' },
      { label: 'Активные', value: 'active' },
    ],
    searchCategory: {
      title: 'Эко-карта',
      input: 'Поиск...',
      category: {
        all: 'Все категории',
        suggested: 'Предложения',
        problems: 'Проблемы',
        solved: 'Реализованные проекты',
      },
    },
    more: 'Подробнее',
    crowdfunding: {
      label: 'Выберите идею, которую хотите поддержать',
      selected: 'Выбранный проект:',
      unselected: 'Ничего не выбрано',
    },
    supportProject: 'Поддержать проект',
    nothingFound: 'Ничего не найдено',
    crowdsourcing: {
      label: 'Выбрано:',
      pic: 'Фото профиля',
    },
    detail: {
      titleIdea: 'Урбан-идеи',
      subtitleIdea: 'Ознакомьтесь с идеями наших пользователей',
      titleArticle: 'Урбан-статьи',
      subtitleArticle: 'Ознакомьтесь с последними новостями',
      share: 'Поделиться',
      map: 'Где пользователь советует реализовать идею',
      otherIdeas: 'Другие публикации',
      otherArticles: 'Другие статьи',
      commentsTitle: 'Комментарии',
      send: 'Отправить',
      sending: 'Отправка...',
      input: 'Введите комментарий',
      filesHave: 'Прикрепленные файлы:',
      noComments: 'Нет комментариев',
      reply: "Ответить",
      inputTxt: 'Введите ответ',
      noFiles: 'Нет прикрепленных файлов',
      fileName: "Файл",
    },
    addAOrI: {
      idea: {
        title: 'Добавить идею',
        zagolovok: {
          title: 'Заголовок идеи',
          placeholder: 'Введите заголовок идеи',
        },
        desc: {
          title: 'Описание идеи',
          placeholder: 'Опишите вашу идею',
        },
        previwImage: 'Добавить обложку',
        images: 'Добавить фотографии',
        files: 'Прикрепить файлы',
        upload: 'Отправка...',
      },
      article: {
        title: 'Добавьте статью',
        zagolovok: {
          title: 'Заголовок статьи',
          placeholder: 'Введите заголовок статьи',
        },
        desc: {
          title: 'Краткое описание',
          placeholder: 'Введите краткое описание',
        },
        images: 'Добавить фотографии',
        files: 'Прикрепить файлы',
        upload: 'Отправка...',
      },
      delete: 'Удалить',
    },
  },
  en: {
    search: 'Search...',
    login: 'Login',
    selectFile: 'Attach files',
    getActionUser: {
      titleArticle: 'Share your thoughts and research on urbanism',
      buttonArticle: 'Add article',
      titleIdea: 'Share your ideas for improving conditions for citizens',
      buttonIdea: 'Add idea',
    },
    profile: {
      profile: 'My profile',
      articles: 'My articles',
      notArticles: 'You have no published articles yet.',
      ideas: 'My ideas',
      noIdeas: 'You have no published ideas yet.',
    },
    navBar: [
      'Urban Ideas Bank',
      'Urban Articles',
      'Crowdfunding',
      'Crowdsourcing',
      'About us',
    ],
    dropdown: [
      { label: 'New', value: 'new' },
      { label: 'Popular', value: 'popular' },
      { label: 'Active', value: 'active' },
    ],
    searchCategory: {
      title: 'Eco-map',
      input: 'Search...',
      category: {
        all: 'All categories',
        suggested: 'Suggestions',
        problems: 'Problems',
        solved: 'Realized projects',
      },
    },
    more: 'More',
    crowdfunding: {
      label: 'Select the idea you want to support',
      selected: 'Selected project:',
      unselected: 'Nothing selected',
    },
    supportProject: 'Support project',
    nothingFound: 'Nothing found',
    crowdsourcing: {
      label: 'Selected:',
      pic: 'Profile photo',
    },
    detail: {
      titleIdea: 'Urban Ideas',
      subtitleIdea: 'Check out ideas from our users',
      titleArticle: 'Urban Articles',
      subtitleArticle: 'Check out the latest news',
      share: 'Share',
      map: 'Where the user suggests to realize the idea',
      otherIdeas: 'Other publications',
      otherArticles: 'Other articles',
      commentsTitle: 'Comments',
      send: 'Send',
      sending: 'Sending...',
      input: 'Enter a comment',
      filesHave: 'Attached files:',
      noComments: 'No comments',
      noFiles: 'No attached files',
      reply: 'Reply',
      inputTxt: 'Your reply',
      fileName: "File",
    },
    addAOrI: {
      idea: {
        title: 'Add idea',
        zagolovok: {
          title: 'Idea title',
          placeholder: 'Enter idea title',
        },
        desc: {
          title: 'Idea description',
          placeholder: 'Describe your idea',
        },
        previwImage: 'Add cover image',
        images: 'Add photos',
        files: 'Attach files',
        upload: 'Sending...',
      },
      article: {
        title: 'Add article',
        zagolovok: {
          title: 'Article title',
          placeholder: 'Enter article title',
        },
        desc: {
          title: 'Short description',
          placeholder: 'Enter short description',
        },
        images: 'Add photos',
        files: 'Attach files',
        upload: 'Sending...',
      },
      delete: 'Delete',
    },
  },
  kg: {
    search: 'Издөө...',
    login: 'Кирүү',
    selectFile: 'Файлдарды тиркөө',
    getActionUser: {
      titleArticle: 'Урбанизм боюнча өз оюңузду жана изилдөөңүздү бөлүшүңүз',
      buttonArticle: 'Макалаларды көчүңүз',
      titleIdea:
        'Шаар тургундарына шарттарды жакшыртуу боюнча өз идеяларыңыз менен бөлүшүңүз',
      buttonIdea: 'Идеаларды көчүңүз',
    },
    profile: {
      profile: 'Менин профилем',
      articles: 'Менин макалаларым',
      notArticles: 'Сизде азырынча жарыяланган макалалар жок.',
      ideas: 'Менин идеяларым',
      noIdeas: 'Сизде азырынча жарыяланган идеялар жок.',
    },
    navBar: [
      'Урбан идеялар банкы',
      'Макалалар',
      'Краудфандинг',
      'Краудсорсинг',
      'Биз жөнүндө',
    ],
    dropdown: [
      { label: 'Жаңылар', value: 'new' },
      { label: 'Популярдуу', value: 'popular' },
      { label: 'Активдүү', value: 'active' },
    ],
    searchCategory: {
      title: 'Эко-карта',
      input: 'Издөө...',
      category: {
        all: 'Бардык категориялар',
        suggested: 'Талаптар',
        problems: 'Көйгөйлөр',
        solved: 'Аяктаган долбоорлор',
      },
    },
    more: 'Көбүрөөк',
    crowdfunding: {
      label: 'Сиз колдогуңуз келген идеяны тандаңыз',
      selected: 'Тандалган проект:',
      unselected: 'Эчнерсе тандалган жок',
    },
    supportProject: 'Проекти колдоо',
    nothingFound: 'Эчнерсе табылган жок',
    crowdsourcing: {
      label: 'Тандалган:',
      pic: 'Профиль сүрөтү',
    },
    detail: {
      titleIdea: 'Урбан-идеялар',
      subtitleIdea: 'Биздин колдонуучулардын идеяларын карап көрүңүз',
      titleArticle: 'Урбан-статьялар',
      subtitleArticle: 'Акыркы жаңылыктарды көрүңүз',
      share: 'Бөлүшүү',
      map: 'Колдонуучу идеяны ишке ашырууга кеңеш берген жерде',
      otherIdeas: 'Башка публикациялар',
      otherArticles: 'Башка макалалар',
      commentsTitle: 'Комментариалар',
      send: 'Жиберүү',
      sending: 'Жиберү...',
      input: 'Комментарий жазыңыз',
      filesHave: 'Кошулган файлдар:',
      noComments: 'Комментарийлер жок',
      noFiles: 'Кошулган файлдар жок',
      reply: 'Жооп берүү',
      inputTxt: 'Жооп жазыңыз',
      fileName: "Файл",
    },
    addAOrI: {
      idea: {
        title: 'Идеяны кошуңуз',
        zagolovok: {
          title: 'Идеянын аталышы',
          placeholder: 'Идеянын аталышын жазыңыз',
        },
        desc: {
          title: 'Идеянын сүрөттөлүшү',
          placeholder: 'Идеяңыз жөнүндө жазыңыз',
        },
        previwImage: 'Капкак сүрөттү кошуу',
        images: 'Сүрөттөрдү кошуу',
        files: 'Файлдарды тиркөө',
        upload: 'Жөнөтүү...',
      },
      article: {
        title: 'Макала кошуу',
        zagolovok: {
          title: 'Макаланын аталышы',
          placeholder: 'Макаланын аталышын жазыңыз',
        },
        desc: {
          title: 'Кыскача баяндама',
          placeholder: 'Кыскача баяндаманы жазыңыз',
        },
        images: 'Сүрөттөрдү кошуу',
        files: 'Файлдарды тиркөө',
        upload: 'Жөнөтүү...',
      },
      delete: 'Жою',
    },
  },
}

// универсальный хук
function useT() {
  const locale = useLocale()
  return translations[locale as keyof typeof translations] ?? translations.ru
}

// ======= Твой прежний API, только короче =======

export const useInputSearchLocale = () => useT().search
export const useLoginButton = () => useT().login
export const useSelectFile = () => useT().selectFile
export const useGetActionUser = () => useT().getActionUser
export const useProfileLocale = () => useT().profile
export const useNavBarTiles = () => useT().navBar
export const useDropDownSearchs = () => useT().dropdown
export const useSearchCategory = () => useT().searchCategory
export const useMoreButton = () => useT().more
export const useCrowdfundingData = () => useT().crowdfunding
export const useSupportProjectIdea = () => useT().supportProject
export const useNothingDefined = () => useT().nothingFound
export const useCrowdsourcingData = () => useT().crowdsourcing
export const useDetailPageLocale = () => useT().detail
export const useAddAOrI = () => useT().addAOrI
