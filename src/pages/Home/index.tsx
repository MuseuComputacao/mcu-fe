import React from 'react';
import { Link } from '@react-navigation/native';
import { StyleSheet, Text, View } from 'react-native';

const nativeRoutes = [
  { label: 'Sobre', path: '/about/' },
  { label: 'Blog', path: '/posts/' },
  { label: 'Tour Virtual', path: '/virtual-tour/' },
  { label: 'Contato', path: '/contact/' },
  { label: 'Seja Voluntário', path: '/volunteer/' },
  { label: 'Seja Patrocinador', path: '/sponsor/' },
];

const Home = () => {
    return (
      <View style={styles.container}>
        <View style={styles.navigation}>
          <Text style={styles.navigationTitle}>Navegação do Museu</Text>
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
            width="100%"
            height="100%"
            frameBorder={0}
          />
        </View>
      </View>
    );
  }

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  navigation: {
    borderBottomColor: '#E7E0D8',
    borderBottomWidth: 1,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  navigationTitle: {
    color: '#18121E',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
  },
  linkRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  link: {
    marginBottom: 4,
    marginRight: 16,
    paddingVertical: 4,
  },
  linkText: {
    color: '#AD4A4A',
    fontSize: 15,
    textDecorationLine: 'underline',
  },
  legacyFrame: {
    flex: 1,
    width: '100%',
  },
});

export default Home;
