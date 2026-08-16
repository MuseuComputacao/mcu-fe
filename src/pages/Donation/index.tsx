import React from 'react';
import { Image, Linking, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import Pressable from '../../components/Pressable';
import { Link } from '@react-navigation/native';

const legacyDonationForm =
  'https://docs.google.com/forms/d/e/1FAIpQLScT0FFWA6Y5PdKHyWJoM5LfZir47BL_UhV1tHYd9GE48ZgX-Q/viewform?usp=pp_url';

const Donation = () => {
  const openLegacyDonationForm = () => {
    Linking.openURL(legacyDonationForm).catch(() => undefined);
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
            <Text accessibilityRole="header" style={styles.title}>Doação de itens</Text>
          </View>
        </View>

        <Link to="/" style={styles.homeLink}>
          <Text style={styles.linkText}>Voltar para o início</Text>
        </Link>

        <Text style={styles.paragraph}>
          Use o formulário público de doação de itens já publicado pelo Museu da Computação.
          O envio continua sendo feito diretamente pelo canal existente.
        </Text>

        <View style={styles.notice}>
          <Text accessibilityRole="header" style={styles.noticeTitle}>Formulário de doação</Text>
          <Text style={styles.noticeText}>
            O formulário original está disponível abaixo. Se ele não carregar no seu
            dispositivo, abra-o em uma nova etapa do navegador.
          </Text>
          {Platform.OS === 'web' && (
            <iframe
              src={legacyDonationForm}
              title="Formulário público de doação de itens do Museu da Computação"
              style={{ border: 0, height: 720, marginBottom: 12, width: '100%' }}
            />
          )}
          <Pressable
            accessibilityLabel="Abrir formulário de doação de itens atual"
            accessibilityRole="link"
            onPress={openLegacyDonationForm}
            style={styles.formLink}
          >
            <Text style={styles.linkText}>Abrir formulário de doação de itens atual</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: { backgroundColor: '#FFFFFF', flex: 1 },
  content: { alignSelf: 'center', maxWidth: 960, padding: 32, width: '100%' },
  header: { alignItems: 'center', flexDirection: 'row', marginBottom: 16 },
  headerText: { flex: 1, marginLeft: 16 },
  logo: { height: 72, width: 96 },
  eyebrow: { color: '#AD4A4A', fontSize: 16, fontWeight: '600' },
  title: { color: '#18121E', fontSize: 32, fontWeight: '700', marginTop: 4 },
  homeLink: { alignSelf: 'flex-start', marginBottom: 24, paddingVertical: 8 },
  paragraph: { color: '#18121E', fontSize: 17, lineHeight: 28, marginBottom: 18 },
  notice: { backgroundColor: '#F8F3EE', borderColor: '#E7E0D8', borderRadius: 10, borderWidth: 1, padding: 20 },
  noticeTitle: { color: '#18121E', fontSize: 22, fontWeight: '700', marginBottom: 8 },
  noticeText: { color: '#18121E', fontSize: 17, lineHeight: 28, marginBottom: 12 },
  formLink: { alignSelf: 'flex-start', paddingVertical: 8 },
  linkText: { color: '#AD4A4A', fontSize: 16, textDecorationLine: 'underline' },
});

export default Donation;
