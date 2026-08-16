import React from 'react';
import {
  Image,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Pressable from '../../components/Pressable';
import { Link } from '@react-navigation/native';

const partners = [
  { name: 'UFRJ', url: 'https://ufrj.br' },
  { name: 'NCE', url: 'http://portal.nce.ufrj.br' },
  { name: 'DCC', url: 'https://www.dcc.ufrj.br' },
];

const mapUrl = 'https://www.google.com/maps/search/?api=1&query=CCMN+UFRJ';

const About = () => {
  const openExternalLink = (url: string) => {
    Linking.openURL(url).catch(() => undefined);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <Image
            accessibilityLabel="Ícone do Museu da Computação"
            source={require('../../../assets/museu-icon.png')}
            style={styles.logo}
          />
          <View style={styles.headerText}>
            <Text style={styles.eyebrow}>Museu da Computação</Text>
            <Text style={styles.title}>Sobre o Museu</Text>
          </View>
        </View>

        <Link to="/" style={styles.homeLink}>
          <Text style={styles.linkText}>Voltar para o início</Text>
        </Link>

        <Text style={styles.paragraph}>
          O Museu da Computação da UFRJ foi oficialmente criado em 2017 para
          apresentar artefatos tecnológicos desenvolvidos no Brasil e no mundo.
          Grande parte desses objetos foi projetada e/ou utilizada na
          Universidade entre as décadas de 1970 e 2000.
        </Text>

        <Text style={styles.paragraph}>
          O Museu tem por objetivo preservar a memória e apresentar a história
          de um período em que o país foi protagonista na construção de um
          conhecimento tecnológico nacional. Mais do que apresentar peças, o
          Museu mostra a construção de uma identidade nacional na área de
          Computação e expõe os frutos desse conhecimento.
        </Text>

        <Text style={styles.paragraph}>
          Participam da construção do Museu da Computação o Instituto Tércio
          Pacitti de Aplicações e Pesquisas Computacionais (NCE/UFRJ), o
          Instituto de Computação (IC/UFRJ), o Programa de Pós-Graduação em
          Informática (PPGI/UFRJ) e o Programa de Pós-Graduação em História das
          Ciências e das Técnicas e Epistemologia (HCTE/UFRJ). A iniciativa é
          apoiada pelo Museu Nacional e integra também a Rede de Museus,
          Acervos e Patrimônios da UFRJ (SIMAP/UFRJ).
        </Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Parceiros</Text>
          {partners.map((partner) => (
            <Pressable
              accessibilityRole="link"
              key={partner.name}
              onPress={() => openExternalLink(partner.url)}
              style={styles.partner}
            >
              <Text style={styles.partnerName}>{partner.name}</Text>
              <Text style={styles.linkText}>{partner.url}</Text>
            </Pressable>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Como chegar</Text>
          <Text style={styles.paragraph}>
            Av. Athos da Silveira Ramos, 274 – Edifício do Centro de Ciências
            Matemáticas e da Natureza – Bloco D – Cidade Universitária – Rio de
            Janeiro, RJ – CEP: 21941-916.
          </Text>
          <Pressable
            accessibilityRole="link"
            onPress={() => openExternalLink(mapUrl)}
            style={styles.mapLink}
          >
            <Text style={styles.linkText}>Abrir localização no Google Maps</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  content: {
    alignSelf: 'center',
    maxWidth: 960,
    padding: 32,
    width: '100%',
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 16,
  },
  headerText: {
    flex: 1,
    marginLeft: 16,
  },
  logo: {
    height: 72,
    width: 96,
  },
  eyebrow: {
    color: '#AD4A4A',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    color: '#18121E',
    fontSize: 32,
    fontWeight: '700',
    marginTop: 4,
  },
  homeLink: {
    alignSelf: 'flex-start',
    marginBottom: 24,
    paddingVertical: 8,
  },
  paragraph: {
    color: '#18121E',
    fontSize: 17,
    lineHeight: 28,
    marginBottom: 18,
  },
  section: {
    borderTopColor: '#E7E0D8',
    borderTopWidth: 1,
    marginTop: 12,
    paddingTop: 24,
  },
  sectionTitle: {
    color: '#18121E',
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
  },
  partner: {
    borderColor: '#E7E0D8',
    borderRadius: 10,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  partnerName: {
    color: '#18121E',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 4,
  },
  linkText: {
    color: '#AD4A4A',
    fontSize: 16,
    textDecorationLine: 'underline',
  },
  mapLink: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
  },
});

export default About;
