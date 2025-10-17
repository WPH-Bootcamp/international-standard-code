import Button from '@/components/ui/Button';
import useHome from './useHome';

const Home = () => {
  const { loading, toggleTheme, changeLanguage, t, i18n, pokemons } = useHome();

  console.log(pokemons);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">{t('welcome')}</h1>

      <p>
        {t('language')}: {i18n.language}
      </p>

      <div className="mt-4 space-x-2">
        <Button variant="primary" onClick={() => changeLanguage('en')}>
          {t('change_to_english')}
        </Button>

        <Button variant="ghost" onClick={() => changeLanguage('id')}>
          {t('change_to_indonesian')}
        </Button>
        <Button variant="secondary" onClick={() => changeLanguage('ar')}>
          {t('change_to_arab')}
        </Button>
      </div>
      <br />
      <Button
        variant="primary"
        size="sm"
        loading={loading}
        onClick={toggleTheme}
      >
        Switch Dark mode
      </Button>
    </div>
  );
};

export default Home;
