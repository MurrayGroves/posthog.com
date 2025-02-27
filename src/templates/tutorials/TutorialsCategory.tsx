import Tutorials from 'components/Tutorials'

export default Tutorials

import { graphql } from 'gatsby'

export const pageQuery = graphql`
    query ($activeFilter: String) {
        tutorials: allMdx(
            sort: { order: DESC, fields: [frontmatter___date] }
            filter: { frontmatter: { topics: { in: [$activeFilter] } }, fields: { slug: { regex: "/^/tutorials/" } } }
        ) {
            nodes {
                ...TutorialsFragment
            }
        }
    }
`
