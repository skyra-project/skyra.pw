import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';
import GeneralPage from 'components/GeneralPage';
import ScrollToTop from 'components/ScrollToTop';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		boldText: {
			fontWeight: 'bolder'
		},
		italicText: {
			fontStyle: 'italic'
		},
		email: {
			color: theme.palette.primary.main
		},
		header: {
			paddingTop: theme.spacing(3),
			paddingBottom: theme.spacing(3)
		},
		spacedText: {
			paddingTop: theme.spacing(1),
			paddingBottom: theme.spacing(1)
		},
		link: {
			color: theme.palette.primary.main,
			'&:hover': {
				color: theme.palette.primary.dark
			}
		}
	})
);

const Email = () => {
	const classes = useStyles();

	return (
		<span>
			{' '}
			<a className={clsx(classes.email, classes.link)} href="mailto:skyra.project@gmail.com">
				skyra.project@gmail.com
			</a>
		</span>
	);
};

const LineSpacer = () => (
	<Box p={1}>
		<wbr />
	</Box>
);

const PrivacyPolicy = () => {
	const classes = useStyles();

	return (
		<>
			<ScrollToTop />
			<GeneralPage>
				<Container maxWidth="lg">
					<Typography id="skyra-privacy-policy" variant="h1" align="center">
						SKYRA PRIVACY POLICY
					</Typography>
					<LineSpacer />
					<Typography variant="body2">Last updated and effective: July 20, 2020</Typography>
					<LineSpacer />
					<Divider />
					<LineSpacer />
					<Typography classes={{ root: classes.boldText }}>OWNER AND DATA CONTROLLER</Typography>
					<Typography component="div">Skyra Project</Typography>
					<Typography component="div">56 Calle María de Guzmán</Typography>
					<Typography component="div">Madrid 28003</Typography>
					<Typography component="div">Spain</Typography>
					<LineSpacer />
					<Typography component="div">
						<span className={classes.boldText}>Owner contact email</span>:<Email />
					</Typography>
					<LineSpacer />
					<Divider />
					<LineSpacer />
					<Typography id="welcome-to-skyra-project" variant="h2" classes={{ root: classes.header }}>
						WELCOME TO SKYRA PROJECT!
					</Typography>
					<Typography component="div">
						Skyra Project provides a chat bot for the{' '}
						<a className={classes.link} href="https://discord.com/privacy">
							Discord
						</a>{' '}
						chat platform, (the "Bot"), a website that serves as a dashboard (the "Site") and various related services
						(collectively, the "Service(s)"). The Service is operated by Skyra Project (the "Company", "we" or "us") for users
						of the Service ("you" or the "user(s)"). This privacy policy sets forth our policy with respect to information that
						is collected from visitors to the Site and users of the Bot and/or the Services. Under applicable law, Skyra Project
						is the "data controller" of{' '}
						<a className={classes.link} href="https://discord.com/privacy">
							Discord
						</a>{' '}
						user data collected through the Services.
					</Typography>
					<Typography id="information-we-collect" variant="h2" classes={{ root: classes.header }}>
						INFORMATION WE COLLECT
					</Typography>
					<Typography component="div">
						When you interact with us through the Services, we may collect information from you, as further described below:
					</Typography>
					<Typography component="div">
						<span className={classes.boldText}>Information You Provide</span>: We collect information from you when you
						voluntarily provide such information, such as when you use any of the Services. Information we collect may include
						but not be limited to cookies, usage data and, usernames, or other content you send via the chat feature when
						interacting with the Bot.
					</Typography>
					<Typography id="other-information" variant="h3" classes={{ root: classes.header }}>
						OTHER INFORMATION
					</Typography>
					<Typography component="div">
						<ul>
							<li>
								<span className={classes.boldText}>Data We Collect Automatically</span>: When you interact with us through
								the Services, we receive and store certain information such as an IP address, device ID and your activities
								within the Services. We may store such information or such information may be included in the databases
								owned and maintained by affiliates, agents or service providers. The Services may use such information and
								pool it with other information to track, for example, the total number of visitors to our Site, the number
								of messages users have sent, as well as the sites which refer visitors to our Services.
							</li>
							<li>
								<span className={classes.boldText}>Cookies</span>: We employ cookies and similar technologies to keep track
								of your local computer's settings such as which account you have logged into on the Site. Cookies are pieces
								of data that sites and services can set on your browser or device that can be read on future visits. We may
								expand our use of cookies to save additional data as new features are added to the Service.
							</li>
							<li>
								We may use third party web site analytics tools such as but not limited to Google Analytics on our Site that
								employ cookies to collect certain information concerning your use of our Services. However, you can disable
								cookies by changing your browser settings. Further information about the procedure to follow in order to
								disable cookies can be found on your Internet browser provider's website via your help screen.
							</li>
						</ul>
					</Typography>
					<Typography id="where-information-is-processed" variant="h2" classes={{ root: classes.header }}>
						WHERE INFORMATION IS PROCESSED
					</Typography>
					<Typography component="div">
						The Company is based in Spain and the Services are hosted from Germany. No matter where you are located you consent
						to processing and transferring of your information in and to Germany, Spain, and other countries. The laws of
						Germany, Spain, and other countries governing data collection and use may not be as comprehensive or protective as
						the laws of the country where you live.
					</Typography>
					<Typography id="our-use-of-your-information" variant="h2" classes={{ root: classes.header }}>
						OUR USE OF YOUR INFORMATION
					</Typography>
					<Typography component="div">
						We use the information you provide in a manner that is consistent with this Privacy Policy. If you provide
						information for a certain reason, we may use the information in connection with the reason for which it was
						provided. For instance, if you contact us by email, we will use the information you provide to answer your question
						or resolve your problem. Also, if you provide information in order to obtain access to the Services, we will use
						your information to provide you with access to such services and to monitor your use of such services. The Company
						and its subsidiaries and affiliates (the “Related Companies”) may also use your information collected through the
						Services to help us improve the content and functionality of the Services, to better understand our users and to
						improve the Services. The Company and its affiliates may use this information to contact you in the future to tell
						you about services we believe will be of interest to you. If we do so, each marketing communication we send you will
						contain instructions permitting you to "opt-out" of receiving future marketing communications. In addition, if at
						any time you wish not to receive any future marketing communications or you wish to have your name deleted from our
						mailing lists, please contact us as indicated below.
					</Typography>
					<Typography id="our-legal-bases-for-handling-of-your-personal-data" variant="h2" classes={{ root: classes.header }}>
						OUR LEGAL BASES FOR HANDLING OF YOUR PERSONAL DATA
					</Typography>
					<Typography component="div">
						The laws in some jurisdictions require companies to tell you about the legal ground they rely on to use or disclose
						your personal data. To the extent those laws apply, our legal grounds are as follows:
					</Typography>
					<Typography component="div">
						<ul>
							<li>
								Users have given their consent for one or more specific purposes.
								<br />
								Note: Under some legislations the Owner may be allowed to process Personal Data until the User objects to
								such processing (“opt-out”), without having to rely on consent or any other of the following legal bases.
								This, however, does not apply, whenever the processing of Personal Data is subject to European data
								protection law.
							</li>
							<li>
								Provision of Data is necessary for the performance of an agreement with the User and/or for any
								pre-contractual obligations thereof.
							</li>
							<li>Processing is necessary for compliance with a legal obligation to which the Owner is subject.</li>
							<li>
								Processing is related to a task that is carried out in the public interest or in the exercise of official
								authority vested in the Owner.
							</li>
							<li>
								Processing is necessary for the purposes of the legitimate interests pursued by the Owner or by a third
								party.
							</li>
						</ul>
					</Typography>
					<Typography component="div">
						In any case, the Owner will gladly help to clarify the specific legal basis that applies to the processing, and in
						particular whether the provision of Personal Data is a statutory or contractual requirement, or a requirement
						necessary to enter into a contract.
					</Typography>
					<Typography id="our-disclosure-of-your-information" variant="h2" classes={{ root: classes.header }}>
						OUR DISCLOSURE OF YOUR INFORMATION
					</Typography>
					<Typography component="div">
						The Company is not in the business of selling your information. We consider this information to be a vital part of
						our relationship with you. There are, however, certain circumstances in which we may share your information with
						certain third parties, as set forth below:
					</Typography>
					<Typography component="div">
						<ul>
							<li>
								<span className={classes.boldText}>Consent</span>: We may transfer your information with your consent.
							</li>
							<li>
								<span className={classes.boldText}>Consultants and outside collaborators</span>: Like many businesses, we
								sometimes request the help of other companies or individuals to perform certain functions. Examples of such
								functions include accessing, modifying and adding to the open-source source code. In order to perform these
								functions they may require samples of any of the data stored by the Services. These people will however{' '}
								<span className={classes.italicText}>never</span> have access to the{' '}
								<span className={classes.italicText}>full</span> data and any data will always be anonymized where required.
							</li>
							<li>
								<span className={classes.boldText}>Legal Requirements</span>: We may disclose your information if required
								to do so by law or in the good faith belief that such action is necessary to (i) comply with a legal
								obligation, (ii) protect and defend the rights or property of the Company or Related Companies, (iii)
								protect the personal safety of users of the Services or the public, or (iv) protect against legal liability.
							</li>
						</ul>
					</Typography>
					<Typography id="unsolicited-information" variant="h2" classes={{ root: classes.header }}>
						UNSOLICITED INFORMATION
					</Typography>
					<Typography component="div">
						You may provide us with ideas for new products or modifications to existing products, and other unsolicited
						submissions (collectively, “Unsolicited Information”). All Unsolicited Information shall be deemed to be
						non-confidential and we shall be free to reproduce, use, disclose, and distribute such Unsolicited Information to
						others without limitation or attribution.
					</Typography>
					<Typography id="children" variant="h2" classes={{ root: classes.header }}>
						CHILDREN
					</Typography>
					<Typography component="div">
						Our Services are for users age 13 and over and we do not knowingly collect personal information from children under
						the age of 13. If you are a parent or guardian of a child under the age of 13 and believe he or she has disclosed
						personal information to us please contact us at <Email />. Note: In some countries, the age of digital consent is
						older than 13. If you are in those countries, you must be at least that age to use the Services. For example, for
						residents of the EEA, where processing of personal information is based on consent, Skyra Project will not knowingly
						engage in that processing for users under the age of consent established by applicable data protection law. If we
						learn that we are engaged in that processing with such users, we will halt such processing and will take reasonable
						measures to promptly remove applicable information from our records.
					</Typography>
					<Typography id="links-to-other-web-sites" variant="h2" classes={{ root: classes.header }}>
						LINKS TO OTHER WEB SITES
					</Typography>
					<Typography component="div">
						This Privacy Policy applies only to the Services. The Services may contain links to other web sites not operated or
						controlled by us (the “Third Party Sites”). The policies and procedures we described here do not apply to the Third
						Party Sites. The links from the Services do not imply that we endorse or have reviewed the Third Party Sites. We
						suggest contacting those sites directly for information on their privacy policies.
					</Typography>
					<Typography id="data-retention" variant="h2" classes={{ root: classes.header }}>
						DATA RETENTION
					</Typography>
					<Typography component="div">
						We generally retain personal data for so long as it may be relevant to the purposes identified herein. To dispose of
						personal data, we may anonymize it, delete it or take other appropriate steps. Data may persist in copies made for
						backup for additional time. Any backups created are always deleted 7 days (168 hours) after their creation.
					</Typography>
					<Typography id="security" variant="h2" classes={{ root: classes.header }}>
						SECURITY
					</Typography>
					<Typography component="div">
						We take reasonable steps to protect the information provided via the Services from loss, misuse, and unauthorized
						access, disclosure, alteration, or destruction. However, no Internet or email transmission is ever fully secure or
						error free. In particular, email sent to or from the Services may not be secure. Therefore, you should take special
						care in deciding what information you send to us via email. Please keep this in mind when disclosing any information
						via the Internet.
					</Typography>
					<Typography id="your-data-rights-and-choices" variant="h2" classes={{ root: classes.header }}>
						YOUR DATA RIGHTS AND CHOICES
					</Typography>
					<Typography component="div" classes={{ root: classes.spacedText }}>
						We believe that users should be treated equally no matter where they are, and so we are making the following options
						to control your data available to all users, regardless of their location.
					</Typography>
					<Typography component="div">
						Individuals in California, the European Economic Area, Canada, Costa Rica and some other jurisdictions have certain
						legal rights to obtain confirmation of whether we hold personal data about them, to access personal data we hold
						about them (including, in some cases, in portable form), and to obtain its correction, update, amendment or deletion
						in appropriate circumstances. They may also object to our uses or disclosures of personal data, to request a
						restriction on its processing, or withdraw any consent, though such actions typically will not have retroactive
						effect. They also will not affect our ability to continue processing data in lawful ways.
					</Typography>
					<Typography component="div">
						<ul>
							<li>
								<span className={classes.boldText}>How can I access the personal data you have about me?</span>
							</li>
						</ul>
					</Typography>
					<Typography component="div">
						If you would like to submit a data access request, you can do so by sending an email to <Email />. Upon request we
						will start the process and provide you a link to access the personal data the Services has on you within 30 standard
						working days.
					</Typography>
					<Typography component="div">
						<ul>
							<li>
								<span className={classes.boldText}>
									How do I correct, update, amend, or delete the personal data you have about me?
								</span>
							</li>
						</ul>
					</Typography>
					<Typography component="div">
						You can request modifications to your data from us directly. Please write us at <Email /> with the words "Personal
						Data Request" in the subject or body of your message, along with an explanation of what data subject right you are
						seeking to exercise. For your protection, we may take steps to verify identity before responding to your request.
					</Typography>
					<Typography id="who-is-skyra-project's-eea-representative?" variant="h2" classes={{ root: classes.header }}>
						WHO IS SKYRA PROJECT'S EEA REPRESENTATIVE?
					</Typography>
					<Typography component="div">
						As the Company is currently exclusively based within the EEA and the Company is of such a small size that we do not
						have the funds to for a registered EEA representative the Company will handle any data protection matters, pursuant
						to Article 27 of the General Data Protection Regulation (the "GDPR") of the European Economic Area (the "EEA")
						themselves. You can contact the Company through aforementioned means.
					</Typography>
					<Typography id="your-california-privacy-rights" variant="h2" classes={{ root: classes.header }}>
						YOUR CALIFORNIA PRIVACY RIGHTS
					</Typography>
					<Typography component="div">
						Consumers residing in California are afforded certain additional rights with respect to their personal information
						under the California Consumer Privacy Act or (“CCPA”) and the “Shine the Light” Law. If you are a California
						resident, this section applies to you.
					</Typography>
					<Typography component="div" classes={{ root: classes.spacedText }}>
						<span className={classes.boldText}>California Consumer Privacy Act</span>
					</Typography>
					<Typography component="div" classes={{ root: classes.spacedText }}>
						<span className={classes.boldText}>Our Collection and Use of Personal Information</span>: We collect the following
						categories of personal information: Discord User ID; internet or other network information (how you interact with
						the application); location information (because your IP address may indicate your general location); and other
						information that identifies or can be reasonably associated with you. For examples of the precise data points we
						collect and the sources of such collection, please see the{' '}
						<a className={classes.link} href="#information-we-collect">
							“INFORMATION WE COLLECT”
						</a>{' '}
						section above. We collect personal information for the business and commercial purposes described in{' '}
						<a className={classes.link} href="#our-use-of-your-information">
							“OUR USE OF YOUR INFORMATION”
						</a>{' '}
						above.
					</Typography>
					<Typography component="div" classes={{ root: classes.spacedText }}>
						<span className={classes.boldText}>Disclosure of Personal Information</span>: We may share your personal information
						with third parties as described in the{' '}
						<a className={classes.link} href="#our-disclosure-of-your-information">
							“OUR DISCLOSURE OF YOUR INFORMATION”
						</a>{' '}
						section above. We disclose the categories of personal information mentioned above for business or commercial
						purposes.
					</Typography>
					<Typography component="div" classes={{ root: classes.spacedText }}>
						<span className={classes.boldText}>No Sale of Personal Information</span>: The CCPA sets forth certain obligations
						for businesses that sell personal information. We do not sell the personal information of our users.
					</Typography>
					<Typography component="div" classes={{ root: classes.spacedText }}>
						<span className={classes.boldText}>Exercising Your Consumer Rights</span>: If you are a California resident, you
						have the right to request (1) more information about the categories and specific pieces of personal information we
						have collected and disclosed for a business purpose in the last 12 months, (2) deletion of your personal
						information, and (3) to opt out of sales of your personal information, if applicable. Details on how to make these
						requests are in the{' '}
						<a className={classes.link} href="#your-data-rights-and-choices">
							“YOUR DATA RIGHTS AND CHOICES”
						</a>{' '}
						section above. We will not discriminate against you if you exercise your rights under the CCPA.
					</Typography>
					<Typography component="div" classes={{ root: classes.spacedText }}>
						Requests Received: We received the following number of data requests between November 24, 2016 and July 20, 2020:
					</Typography>
					<Typography component="div" classes={{ root: classes.spacedText }}>
						<span className={classes.italicText}>No requests to date</span>
					</Typography>
					<Typography id="changes-to-this-privacy-policy" variant="h2" classes={{ root: classes.header }}>
						CHANGES TO THIS PRIVACY POLICY
					</Typography>
					<Typography component="div">
						We reserve the right to update or modify this Privacy Policy at any time and from time to time without prior notice.
						Please review this policy periodically, and especially before you provide any information. This Privacy Policy was
						last updated on the date indicated above. Your continued use of the Services after any changes or revisions to this
						Privacy Policy shall indicate your agreement with the terms of such revised Privacy Policy.
					</Typography>
					<Typography id="contacting-us" variant="h2" classes={{ root: classes.header }}>
						CONTACTING US
					</Typography>
					<Typography component="div">
						Please also feel free to contact us if you have any questions about this Privacy Policy or the information practices
						of the Services. You may contact us as follows: <Email />.
					</Typography>
					{[0, 1, 2].map(idx => (
						<LineSpacer key={idx} />
					))}
				</Container>
			</GeneralPage>
		</>
	);
};

export default PrivacyPolicy;
