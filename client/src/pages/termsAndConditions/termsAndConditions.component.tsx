// React
import React from 'react';
// Layout
import MainLayout from '../../layout/main/main.layout';
// Styled
import { TermsAndConditionsWrapper } from './termsAndConditions.styles';
// Components
import SectionHeader from '../../components/sectionHeader/sectionHeader.component';
import SmallHeader from '../../components/smallHeader/smallHeader.component';
import TextBlock from '../../components/textBlock/textBlock.component';
import BackButton from '../../components/backButton/backButton.component';

type TermsAndConditionsProps = {};

const TermsAndConditions: React.FC<TermsAndConditionsProps> = () => (
  <MainLayout>
    <BackButton />
    <TermsAndConditionsWrapper>
      <SmallHeader>Generic Terms and Conditions Template</SmallHeader>
      <TextBlock>
        Please read these terms and conditions ("terms and conditions", "terms")
        carefully before using [website] website (“website”, "service") operated
        by [name] ("us", 'we", "our").
      </TextBlock>
      <SectionHeader>Conditions of use</SectionHeader>
      <TextBlock>
        By using this website, you certify that you have read and reviewed this
        Agreement and that you agree to comply with its terms. If you do not
        want to be bound by the terms of this Agreement, you are advised to
        leave the website accordingly. [name] only grants use and access of this
        website, its products, and its services to those who have accepted its
        terms.
      </TextBlock>
      <SectionHeader>Privacy policy</SectionHeader>
      <TextBlock>
        Before you continue using our website, we advise you to read our privacy
        policy [link to privacy policy] regarding our user data collection. It
        will help you better understand our practices.
      </TextBlock>
      <SectionHeader>Age restriction</SectionHeader>
      <TextBlock>
        You must be at least 18 (eighteen) years of age before you can use this
        website. By using this website, you warrant that you are at least 18
        years of age and you may legally adhere to this Agreement. [name]
        assumes no responsibility for liabilities related to age
        misrepresentation.
      </TextBlock>
      <SectionHeader>Intellectual property</SectionHeader>
      <TextBlock>
        You agree that all materials, products, and services provided on this
        website are the property of [name], its affiliates, directors, officers,
        employees, agents, suppliers, or licensors including all copyrights,
        trade secrets, trademarks, patents, and other intellectual property. You
        also agree that you will not reproduce or redistribute the [name]’s
        intellectual property in any way, including electronic, digital, or new
        trademark registrations.
      </TextBlock>
      <TextBlock>
        You grant [name] a royalty-free and non-exclusive license to display,
        use, copy, transmit, and broadcast the content you upload and publish.
        For issues regarding intellectual property claims, you should contact
        the company in order to come to an agreement.
      </TextBlock>
      <SectionHeader>User accounts</SectionHeader>
      <TextBlock>
        As a user of this website, you may be asked to register with us and
        provide private information. You are responsible for ensuring the
        accuracy of this information, and you are responsible for maintaining
        the safety and security of your identifying information. You are also
        responsible for all activities that occur under your account or
        password.
      </TextBlock>
      <TextBlock>
        If you think there are any possible issues regarding the security of
        your account on the website, inform us immediately so we may address it
        accordingly.
      </TextBlock>
      <TextBlock>
        We reserve all rights to terminate accounts, edit or remove content and
        cancel orders in their sole discretion.
      </TextBlock>
      <SectionHeader>Applicable law</SectionHeader>
      <TextBlock>
        By visiting this website, you agree that the laws of the [location],
        without regard to principles of conflict laws, will govern these terms
        and conditions, or any dispute of any sort that might come between
        [name] and you, or its business partners and associates.
      </TextBlock>
      <SectionHeader>Disputes</SectionHeader>
      <TextBlock>
        Any dispute related in any way to your visit to this website or to
        products you purchase from us shall be arbitrated by state or federal
        court [location] and you consent to exclusive jurisdiction and venue of
        such courts.
      </TextBlock>
      <SectionHeader>Indemnification</SectionHeader>
      <TextBlock>
        You agree to indemnify [name] and its affiliates and hold [name]
        harmless against legal claims and demands that may arise from your use
        or misuse of our services. We reserve the right to select our own legal
        counsel.
      </TextBlock>
      <SectionHeader>Limitation on liability</SectionHeader>
      <TextBlock>
        [name] is not liable for any damages that may occur to you as a result
        of your misuse of our website.
      </TextBlock>
      <TextBlock>
        [name] reserves the right to edit, modify, and change this Agreement any
        time. We shall let our users know of these changes through electronic
        mail. This Agreement is an understanding between [name] and the user,
        and this supersedes and replaces all prior agreements regarding the use
        of this website.
      </TextBlock>
    </TermsAndConditionsWrapper>
  </MainLayout>
);
export default TermsAndConditions;
