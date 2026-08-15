import React from 'react';
import { Link } from '@react-navigation/native';
import { Image, StyleSheet, Text, useWindowDimensions, View } from 'react-native';

const nativeRoutes = [
  { label: 'Sobre', path: '/about/' },
  { label: 'Blog', path: '/posts/' },
  { label: 'Tour Virtual', path: '/virtual-tour/' },
  { label: 'Contato', path: '/contact/' },
  { label: 'Seja Voluntário', path: '/volunteer/' },
  { label: 'Seja Patrocinador', path: '/sponsor/' },
];

const Home = () => {
  const { height: viewportHeight, width: viewportWidth } = useWindowDimensions();
  const legacyNavigationHeight = viewportWidth < 768 ? 64 : 106;

  return (
    <View style={styles.container}>
      <View
        accessibilityLabel="Navegação principal do Museu da Computação"
        style={styles.navigation}
      >
        <View style={styles.brandRow}>
          <Image
            accessibilityLabel="Símbolo do Museu da Computação"
            source={require('../../../assets/museu-icon-square.png')}
            style={styles.brandMark}
          />
          <View>
            <Text style={styles.brandName}>Museu da Computação</Text>
            <Text style={styles.brandSubtitle}>Universidade Federal do Rio de Janeiro</Text>
          </View>
        </View>

        <View style={styles.linkRow}>
          {nativeRoutes.map((route) => (
            <Link key={route.path} to={route.path} style={styles.link}>
              <Text style={styles.linkText}>{route.label}</Text>
            </Link>
          ))}
        </View>
      </View>

      <View style={styles.legacyFrame}>
        <iframe
          src="https://museucomputacao.github.io"
          title="Página pública legada do Museu da Computação"
          width="100%"
          frameBorder={0}
          style={{
            border: 0,
            display: 'block',
            flexShrink: 0,
            height: viewportHeight + legacyNavigationHeight,
            transform: `translateY(-${legacyNavigationHeight}px)`,
            width: '100%',
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  brandMark: {
    height: 46,
    marginRight: 12,
    width: 46,
  },
  brandName: {
    color: '#F8F2EA',
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
  brandRow: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
  brandSubtitle: {
    color: '#D2BDC0',
    fontSize: 10,
    letterSpacing: 0.35,
    marginTop: 2,
    textTransform: 'uppercase',
  },
  container: {
    backgroundColor: '#17111D',
    flex: 1,
  },
  legacyFrame: {
    flex: 1,
    overflow: 'hidden',
    width: '100%',
  },
  link: {
    backgroundColor: '#2A1A29',
    borderColor: '#664150',
    borderRadius: 999,
    borderWidth: 1,
    marginBottom: 6,
    marginRight: 8,
    paddingHorizontal: 13,
    paddingVertical: 8,
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  linkText: {
    color: '#F8F2EA',
    fontSize: 14,
    fontWeight: '600',
  },
  navigation: {
    backgroundColor: '#17111D',
    borderBottomColor: '#A91D3A',
    borderBottomWidth: 2,
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 8,
  },
});

export default Home;
