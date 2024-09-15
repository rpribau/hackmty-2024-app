import { View, Text, ScrollView, StyleSheet, Switch, Button, Modal, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const IoTSettings = ({ recommendedTime }) => {
  const [isManualEnabled, setIsManualEnabled] = useState(true);
  const [isAutomaticEnabled, setIsAutomaticEnabled] = useState(false);
  const [selectedTimeHose1, setSelectedTimeHose1] = useState('11:10');
  const [selectedTimeHose2, setSelectedTimeHose2] = useState('12:20');
  const [selectedTimeHose3, setSelectedTimeHose3] = useState('13:30');

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [currentHose, setCurrentHose] = useState(null);

  useEffect(() => {
    // Set recommendedTime when automatic is enabled
    if (isAutomaticEnabled && recommendedTime) {
      setSelectedTimeHose1(recommendedTime); // Use the recommended time for hose 1
      setSelectedTimeHose2(recommendedTime);
      setSelectedTimeHose3(recommendedTime);
    }
  }, [isAutomaticEnabled, recommendedTime]);

  const toggleManualSwitch = () => {
    if (!isManualEnabled) {
      setIsManualEnabled(true);
      setIsAutomaticEnabled(false);
    }
  };

  const toggleAutomaticSwitch = () => {
    if (!isAutomaticEnabled) {
      setIsAutomaticEnabled(true);
      setIsManualEnabled(false);
    }
  };

  const openTimePicker = (hoseId) => {
    setCurrentHose(hoseId);
    setShowTimePicker(true);
  };

  const onTimeChange = (event, selectedDate) => {
    const selectedTime = selectedDate || new Date();
    setShowTimePicker(false);

    const hours = selectedTime.getHours().toString().padStart(2, '0');
    const minutes = selectedTime.getMinutes().toString().padStart(2, '0');
    const formattedTime = `${hours}:${minutes}`;

    switch (currentHose) {
      case 'hose1':
        setSelectedTimeHose1(formattedTime);
        break;
      case 'hose2':
        setSelectedTimeHose2(formattedTime);
        break;
      case 'hose3':
        setSelectedTimeHose3(formattedTime);
        break;
      default:
        break;
    }
  };

  const renderHoseControls = (hoseId, selectedTime) => (
    <View style={styles.hoseContainer}>
      <View style={styles.hoseLabelContainer}>
        <Text style={styles.hoseLabel}>Manguera {hoseId}</Text>
      </View>
      <Button
        title="Seleccionar hora"
        onPress={() => openTimePicker(`hose${hoseId}`)}
        disabled={isAutomaticEnabled}
      />
      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, isAutomaticEnabled && styles.disabledText]}>
          {isAutomaticEnabled
            ? `Se activará a las: 18:00` // Fixed static time
            : `Se activará a las: ${selectedTime}`}
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Text style={styles.title}>IoT Settings</Text>

      <View style={styles.switchContainer}>
        <Text style={styles.manualActivation}>Manual Activation</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#67CD67' }}
          thumbColor={isManualEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleManualSwitch}
          value={isManualEnabled}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.automaticActivation}>Automatic Activation</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#67CD67' }}
          thumbColor={isAutomaticEnabled ? '#f4f3f4' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={toggleAutomaticSwitch}
          value={isAutomaticEnabled}
        />
      </View>

      {/* GroundBox for crops */}
      <View style={styles.PotatoBox}>
        <Text style={styles.cropTitle}>Cosecha de papa</Text>
        {renderHoseControls(1, selectedTimeHose1)}
        {renderHoseControls(2, selectedTimeHose2)}
      </View>

      <View style={styles.TomatoBox}>
        <Text style={styles.cropTitle}>Cosecha de tomate</Text>
        {renderHoseControls(3, selectedTimeHose3)}
      </View>

      {/* Time picker modal */}
      {showTimePicker && (
        <Modal
          transparent={true}
          visible={showTimePicker}
          animationType="slide"
          onRequestClose={() => setShowTimePicker(false)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <DateTimePicker
                value={new Date()}
                mode="time"
                is24Hour={true}
                display="default"
                onChange={onTimeChange}
              />
              <View style={styles.modalButtons}>
                <TouchableOpacity onPress={() => setShowTimePicker(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Cancelar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowTimePicker(false)} style={styles.modalButton}>
                  <Text style={styles.modalButtonText}>Guardar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 38,
    marginTop: 50,
    textAlign: 'left',
    alignSelf: 'flex-start',
    width: '100%',
    fontWeight: 'bold',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  manualActivation: {
    fontSize: 18,
    fontWeight: '500',
  },
  automaticActivation: {
    fontSize: 18,
    fontWeight: '500',
  },
  PotatoBox: {
    marginTop: 30,
    width: 300,
    height: 250,
    marginHorizontal: 20,
    backgroundColor: '#D6D3CF',
    borderRadius: 20,
    padding: 10,
  },
  TomatoBox: {
    marginTop: 30,
    width: 300,
    height: 150,
    marginHorizontal: 20,
    backgroundColor: '#D6D3CF',
    borderRadius: 20,
    padding: 10,
  },
  cropTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  hoseContainer: {
    marginBottom: 10,
  },
  hoseLabelContainer: {
    marginBottom: 5,
  },
  hoseLabel: {
    fontSize: 16,
  },
  timeContainer: {
    marginTop: 5,
    alignItems: 'center',
  },
  timeText: {
    fontSize: 16,
    color: 'blue',
  },
  disabledText: {
    color: 'gray',
    fontStyle: 'italic',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
    width: '100%',
  },
  modalButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
  },
  modalButtonText: {
    fontSize: 16,
    color: '#007BFF',
  },
});

export default IoTSettings;