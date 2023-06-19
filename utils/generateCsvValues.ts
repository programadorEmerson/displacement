function generateCsvValues<T extends object>(objeto: T): Record<string, string> {
  const novoObjeto: Record<string, string> = {};
  Object.keys(objeto).forEach(chave => {
    const nomeConvertido = chave.replace(/([a-z])([A-Z])/g, '$1 $2').toLowerCase();
    novoObjeto[nomeConvertido] = String(objeto[chave as keyof T]);
  });
  return novoObjeto;
}

export default generateCsvValues;
