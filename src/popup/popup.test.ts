import { updateApiKey } from './popup';

// Mock the Chrome storage API
const chromeMock = {
  storage: {
    sync: {
      set: jest.fn((data, callback) => callback()),
    }
  }
};
// Replace the global chrome object with the mock
global.chrome = chromeMock as unknown as typeof chrome;

describe('Popup', () => {
  it('should store the API key when updateApiKey is called', () => {
    // Arrange
    const apiKey = 'test-api-key';
    const inputElement = { value: apiKey } as HTMLInputElement;

    // Act
    updateApiKey(inputElement);

    // Assert
    expect(chromeMock.storage.sync.set).toHaveBeenCalledWith({ apiKey }, expect.any(Function));
  });
});