import { getFruitIds, getFruitData } from '../lib/fruit_data';
import { getVeggieIds, getVeggieData } from '../lib/veggie_data';
import Layout from '../components/layout';

// define getStaticProps() function - by nextJS
export async function getStaticProps({ params }) {
  const fruitItemData = await fetch(
    'https://dev-teevan-fall-cs55-13.pantheonsite.io/wp-json/twentytwentyone-child/v1/latest-posts/2'
  );
  const veggieItemData = await getVeggieData(params.id);
  return {
    props: {
      fruitItemData,
      veggieItemData,
    },
  };
}

// define getStaticPaths() - by nextJS
export async function getStaticPaths() {
  const fruitPaths = getFruitIds();
  const veggiePaths = getVeggieIds();

  return {
    paths: [...fruitPaths, ...veggiePaths],
    fallback: false,
  };
}

//export our dynamically routed page component 'Entry'
export default function Entry({ fruitItemData, veggieItemData }) {
  return (
    <Layout>
      <article className="card col-6">
        <div className="card-body">
          {fruitItemData && (
            <>
              <h2 className="card-title">{fruitItemData.icon}</h2>
              <h3 className="card-subtitle mb-2 text-body-secondary">
                {fruitItemData.name}
              </h3>
              <p className="card-text">{fruitItemData.description}</p>
              <p className="card-link">{fruitItemData.rating}</p>
            </>
          )}
          {veggieItemData && (
            <>
              <h2 className="card-title">{veggieItemData.icon}</h2>
              <h3 className="card-subtitle mb-2 text-body-secondary">
                {veggieItemData.name}
              </h3>
              <p className="card-text">{veggieItemData.description}</p>
              <p className="card-link">{veggieItemData.rating}</p>
            </>
          )}
        </div>
      </article>
    </Layout>
  );
}
