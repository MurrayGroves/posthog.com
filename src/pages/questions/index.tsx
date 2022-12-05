import { DocSearchModal } from '@docsearch/react'
import { Blockquote } from 'components/BlockQuote'
import Breadcrumbs from 'components/Breadcrumbs'
import { MdxCodeBlock } from 'components/CodeBlock'
import { Days } from 'components/CommunityQuestions/Question'
import { Check } from 'components/Icons/Icons'
import { InlineCode } from 'components/InlineCode'
import Layout from 'components/Layout'
import Link from 'components/Link'
import { SEO } from 'components/seo'
import Icon from 'components/SupportImages/Icon'
import { ZoomImage } from 'components/ZoomImage'
import { motion } from 'framer-motion'
import { GatsbyImage, getImage, StaticImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import { dayFormat, dateToDays } from '../../utils'
import { Form } from 'squeak-react'

const TopLink = ({ title, description, link, icon }) => {
    return (
        <li className="w-full">
            <a
                href={link}
                className="flex flex-col items-center text-center text-black hover:text-black opacity-80 hover:opacity-100 hover:bg-gray-accent/25 dark:hover:bg-gray-accent/10 px-4 py-5 h-full space-y-1"
            >
                <Icon className="w-6 h-6 mb-2 text-gray" name={icon} />
                <h3 className="font-bold text-base mb-0 leading-none">{title}</h3>
                <p className="text-sm font-semibold text-gray dark:text-white dark:text-opacity-75 mb-0">
                    {description}
                </p>
            </a>
        </li>
    )
}

const Search = () => {
    const [value, setValue] = useState('')
    const [modal, setModal] = useState(false)
    const [showForm, setShowForm] = useState(false)
    const [formValues, setFormValues] = useState(null)

    const handleSubmit = (e) => {
        e.preventDefault()
        if (value.trim()) {
            setModal(true)
        }
    }

    const handleSqueakSubmit = (values) => {
        setFormValues(values)
    }

    return (
        <>
            {modal && (
                <DocSearchModal
                    onClose={() => setModal(false)}
                    initialQuery={value}
                    appId="B763I3AO0D"
                    indexName="posthog"
                    apiKey="f1386529b9fafc5c3467e0380f19de4b"
                />
            )}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col justify-center relative mx-auto mb-0 w-full max-w-lg"
            >
                <div className="absolute left-4 w-4 h-4">
                    <svg className="opacity-50" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18">
                        <g opacity="1" clipPath="url(#a)">
                            <path
                                d="m18 15.964-4.794-4.793A7.2 7.2 0 1 0 .001 7.2a7.2 7.2 0 0 0 11.17 6.006L15.963 18 18 15.964ZM2.04 7.2A5.16 5.16 0 0 1 7.2 2.043 5.16 5.16 0 1 1 2.04 7.2Z"
                                fill="#90794B"
                            />
                        </g>
                        <defs>
                            <clipPath id="a">
                                <path fill="#fff" d="M0 0h18v18H0z" />
                            </clipPath>
                        </defs>
                    </svg>
                </div>
                <input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    name="faq-search"
                    placeholder="Search anything product, installation, or company-related..."
                    autoFocus={true}
                    className="pl-10 py-3 text-base bg-white dark:bg-gray-accent-dark rounded-full w-full ring-red shadow-lg"
                />

                <button className="hidden px-6 py-3 bg-red text-lg shadow-md rounded-sm text-white font-bold">
                    Search
                </button>
            </form>
            {showForm && (
                <motion.div className="mt-4 max-w-[450px]" initial={{ height: 0 }} animate={{ height: 'auto' }}>
                    {formValues ? (
                        <div>
                            <p className="flex items-center space-x-1 font-semibold text-[#43AF79]">
                                <span className=" w-[24px] h-[24px] bg-[#43AF79] rounded-full flex justify-center items-center">
                                    <Check className="w-[12px] h-[12px] text-white" />
                                </span>
                                <span>Question sent. Thread will be posted here.</span>
                            </p>
                        </div>
                    ) : (
                        <Form
                            onSubmit={handleSqueakSubmit}
                            apiHost="https://squeak.cloud"
                            organizationId="a898bcf2-c5b9-4039-82a0-a00220a8c626"
                        />
                    )}
                </motion.div>
            )}
        </>
    )
}

const Question = ({ question }) => {
    const replies = question.childrenReply
    const { avatar, name, ts, childMdx } = replies[0]

    const components = {
        inlineCode: InlineCode,
        blockquote: Blockquote,
        pre: MdxCodeBlock,
        img: ZoomImage,
    }
    return (
        <li className="mt-9 first:mt-7">
            <div className="flex space-x-2">
                {avatar ? (
                    <GatsbyImage className="rounded-full overflow-hidden" image={getImage(avatar)} />
                ) : (
                    <svg width="20" height="20" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                            fill="#BFBFBC"
                        />
                        <path
                            d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                            fill="#BFBFBC"
                        />
                    </svg>
                )}
                <p className="text-black dark:text-white m-0 text-[13px] font-semibold opacity-50 flex space-x-2">
                    {name} <Days ts={ts} url={`/questions/${question.id}`} />
                </p>
            </div>
            <div className="artcle-content my-2">
                <p className="m-0">{childMdx.excerpt}</p>
            </div>
            <Link className="text-red hover:red m-0 text-[14px] font-semibold" to={`/questions/${question.id}`}>
                {replies.length - 1} response{replies.length - 1 === 1 ? '' : 's'}
            </Link>
        </li>
    )
}

const Header = () => {
    return (
        <section>
            <div className="relative">
                <div className="max-w-4xl mx-auto my-12  flex flex-col justify-center">
                    <h1 className="text-center">Questions?</h1>
                    <h5 className="text-center">Search answers across posthog.com</h5>
                    <Search />
                    <p className="mt-3 text-sm text-gray text-center font-semibold">
                        Can't find your answer? <button className="text-red">Ask a question</button>
                    </p>
                </div>

                <span className="absolute bottom-[calc(-170px-3rem)] hidden mdlg:block md:-left-24 lg:-left-20 z-[-10] transition-all">
                    <StaticImage
                        src="../../../contents/images/search-hog-1.png"
                        alt="This hog has an answer"
                        height={512}
                        width={440}
                        placeholder="blurred"
                        className="h-full xl:max-w-none ml-0 md:ml-0"
                    />
                </span>

                <span className="absolute bottom-[calc(-101px-3rem)] hidden mdlg:block md:-right-40 lg:-right-36 xl:-right-24 2xl:-right-14 z-[-20] transition-all">
                    <StaticImage
                        src="../../../contents/images/search-hog-2.png"
                        alt="This hog has an answer"
                        height={407}
                        width={449}
                        placeholder="blurred"
                        className="h-full xl:max-w-none ml-0 md:ml-0"
                    />
                </span>
            </div>
        </section>
    )
}

export default function Questions() {
    const [questions, setQuestions] = useState<any[]>([])

    const fetchQuestions = React.useCallback(async () => {
        try {
            console.log(questions.length)
            const res = await fetch(
                `https://squeak.cloud/api/questions?organizationId=a898bcf2-c5b9-4039-82a0-a00220a8c626`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        organizationId: 'a898bcf2-c5b9-4039-82a0-a00220a8c626',
                        start: questions.length,
                        published: true,
                    }),
                }
            )

            const data = await res.json()
            setQuestions((qs) => [...qs, ...data.questions])
        } catch (error) {
            console.log(error)
        }
    }, [questions.length])

    console.log(questions)

    useEffect(() => {
        fetchQuestions()
    }, [])

    return (
        <Layout>
            <SEO title={'Questions - PostHog'} />
            <Breadcrumbs
                crumbs={[{ title: 'Questions' }]}
                darkModeToggle
                className="px-4 mt-4 sticky top-[-2px] z-10 bg-tan dark:bg-primary"
            />
            <Header />

            <section>
                <div className="border-t border-b border-dashed border-gray mb-12 -mx-4">
                    <div className="max-w-4xl w-full mx-auto">
                        <ol className="list-none m-0 p-0 md:grid md:grid-cols-5 justify-center divide-y md:divide-y-0 md:divide-x divide-dashed divide-gray">
                            <TopLink
                                title="Self-hosting"
                                description="Deployment options"
                                link="/docs/self-host#deployment-options"
                                icon="selfHost"
                            />
                            <TopLink
                                title="Partners"
                                description="Hosting & support"
                                link="/partners"
                                icon="partners"
                            />
                            <TopLink title="FAQ" description=" " link="/faq" icon="faq2" />
                            <TopLink
                                title="Report an issue"
                                description="via GitHub"
                                link="https://github.com/PostHog/posthog/issues"
                                icon="issue2"
                            />
                            <TopLink title="API" description="Apps, data I/O" link="/docs/api" icon="api" />
                        </ol>
                    </div>
                </div>

                <div className="max-w-6xl mx-auto my-12">
                    <div className="px-4 sm:px-6 lg:px-8">
                        <div className="w-full sm:flex sm:items-center">
                            <div className="ml-auto">
                                <button
                                    type="button"
                                    className="inline-flex items-center justify-center rounded-md border border-transparent bg-red px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                                >
                                    Ask a question
                                </button>
                            </div>
                        </div>
                        <div className="mt-8 flex flex-col">
                            <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                                <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                    <div className="overflow-hidden border border-dashed border-gray-accent-light">
                                        <table className="min-w-full">
                                            <thead className="bg-gray-50 border-b border-gray-accent-light border-dashed">
                                                <tr className="">
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                                                    >
                                                        Topic
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6"
                                                    >
                                                        Replies
                                                    </th>
                                                    <th
                                                        scope="col"
                                                        className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900"
                                                    >
                                                        Activity
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-accent-light divide-dashed">
                                                {questions.map(({ question, profile, numReplies }) => {
                                                    const latestReply = question.replies[question.replies.length - 1]

                                                    return (
                                                        <tr key={question.id} className="">
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6 space-y-2">
                                                                <div className="flex items-center space-x-2">
                                                                    <Link to={`/questions/${question.permalink}`}>
                                                                        <span className="text-[16px]">
                                                                            {question.subject}
                                                                        </span>
                                                                    </Link>
                                                                    {/*question.topics.map(({ topic }) => {
                                                                    return (
                                                                        <div
                                                                            key={topic.id}
                                                                            className="bg-gray-accent-light text-gray px-1 py-0.5 rounded-sm"
                                                                        >
                                                                            {topic.label}
                                                                        </div>
                                                                    )
                                                                })*/}
                                                                </div>
                                                                <p className="max-w-xl break-words whitespace-normal line-clamp-2 text-sm opacity-90">
                                                                    {question.replies[0].body}
                                                                </p>
                                                                <a
                                                                    href={`/community/profiles/${profile.id}`}
                                                                    className="flex items-center space-x-1.5"
                                                                >
                                                                    <div
                                                                        className={`w-5 h-5 overflow-hidden rounded-full`}
                                                                    >
                                                                        {profile.avatar ? (
                                                                            <img
                                                                                className="w-full h-full"
                                                                                alt=""
                                                                                src={profile.avatar}
                                                                            />
                                                                        ) : (
                                                                            <svg
                                                                                viewBox="0 0 40 40"
                                                                                fill="none"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                            >
                                                                                <path
                                                                                    d="M20.0782 41.0392H5.42978C4.03134 41.0392 3.1173 40.1642 3.09386 38.7736C3.07823 37.7814 3.07042 36.797 3.10948 35.8048C3.15636 34.6329 3.72668 33.7345 4.74228 33.1798C8.0782 31.3595 11.4299 29.5783 14.7659 27.7658C15.0081 27.633 15.1565 27.758 15.3362 27.8517C18.1878 29.3439 21.0942 29.4689 24.0626 28.2267C24.1485 28.1955 24.2423 28.1721 24.3126 28.1096C24.9298 27.5861 25.4845 27.7971 26.1251 28.1486C29.1173 29.7971 32.1331 31.4143 35.1487 33.0238C36.4534 33.7191 37.094 34.766 37.0706 36.2426C37.0549 37.0785 37.0706 37.9067 37.0706 38.7426C37.0628 40.1254 36.1409 41.0395 34.7659 41.0395H20.0783L20.0782 41.0392Z"
                                                                                    fill="#BFBFBC"
                                                                                ></path>
                                                                                <path
                                                                                    d="M19.8359 27.0625C17.0859 26.9687 14.8047 25.6094 13.1251 23.1953C10.3751 19.2344 10.7032 13.6093 13.8516 10.0001C17.2735 6.08599 22.9452 6.10943 26.336 10.0469C29.9376 14.2345 29.711 20.8437 25.8126 24.6405C24.2188 26.1952 22.3126 27.0312 19.8362 27.0624L19.8359 27.0625Z"
                                                                                    fill="#BFBFBC"
                                                                                ></path>
                                                                            </svg>
                                                                        )}
                                                                    </div>
                                                                    <span className="text-gray font-semibold">
                                                                        {profile.first_name} {profile.last_name}
                                                                    </span>
                                                                </a>
                                                            </td>
                                                            <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6 text-gray font-semibold">
                                                                {numReplies}
                                                            </td>
                                                            <td className="whitespace-nowrap p-4 text-sm text-gray-500 text-gray font-semibold">
                                                                {dayFormat(dateToDays(latestReply.created_at))}
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <button onClick={() => fetchQuestions(questions.length)}>Load more</button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </Layout>
    )
}
