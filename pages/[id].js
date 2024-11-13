import { getFruitIds, getFruitData } from '../lib/fruit_data';

import Layout from '../components/layout';

// define getStaticProps() function - by nextJS
export async function getStaticProps({ params }) {
  const fruitItemData = await getFruitData(params.id);
  return {
    props: {
      fruitItemData,
    },
  };
}

// define getStaticPaths() - by nextJS
export async function getStaticPaths() {
  const fruitPaths = await getFruitIds();

  return {
    paths: [...fruitPaths],
    fallback: false,
  };
}

//export our dynamically routed page component 'Entry'
export default function Entry({ fruitItemData }) {
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
        </div>
      </article>
    </Layout>
  );
}
