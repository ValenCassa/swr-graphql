import { graphql, useFragment } from "~/gql";
import { useLazyQuery, useQuery } from "~/hook/useQuery";

export const CountryInfoFragment = graphql(`
  fragment CountryInfo on Country {
    name @skip(if: $skipName)
    capital
    languages @include(if: $withLanguages) {
      name
    }
  }
`);

export const CountryQuery = graphql(`
  query GetCountry(
    $countryCode: ID!
    $withLanguages: Boolean = false
    $skipName: Boolean = false
  ) {
    country(code: $countryCode) {
      ...CountryInfo
    }
  }
`);

export default function Home() {
  /*const { data } = useQuery(CountryQuery, {
    countryCode: "AR",
    withLanguages: true,
  }); */

  const { trigger, data } = useLazyQuery(CountryQuery, { countryCode: "AR" });
  const frag = useFragment(CountryInfoFragment, data?.country);

  console.log(frag);

  return <button onClick={() => trigger()}>trigger</button>;
}
