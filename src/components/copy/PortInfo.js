import React from 'react';
import './PortInfo.css';

const PortInfo = () => {
  const portData = [
    { port: 20, description: 'FTP(파일 전송 프로토콜)는 암호화되지 않은 통신을 사용하므로, 민감한 데이터가 전송될 경우 공격자가 이를 가로챌 수 있습니다.' },
    { port: 21, description: 'FTP(파일 전송 프로토콜)는 암호화되지 않은 통신을 사용하므로, 민감한 데이터가 전송될 경우 공격자가 이를 가로챌 수 있습니다.' },
    { port: 22, description: 'SSH는 보안 통신을 위한 포트로, 원격 서버 관리 등에 사용됩니다. 다만, 약한 비밀번호나 취약한 인증 방식으로 공격을 받을 수 있습니다.' },
    { port: 23, description: 'Telnet은 암호화되지 않은 원격 접속 프로토콜로, 패스워드나 다른 민감한 정보가 노출될 위험이 큽니다.' },
    { port: 25, description: '메일 전송을 위한 포트로, 스팸 메일 발송에 악용될 수 있습니다. 또한, 인증되지 않은 이메일 발송에 취약할 수 있습니다.' },
    { port: 53, description: 'DNS 서비스는 주로 도메인 이름을 IP 주소로 변환하는 역할을 하지만, DNS 스푸핑이나 DDoS 공격에 취약할 수 있습니다.' },
    { port: 80, description: '웹 트래픽을 위한 포트로, 취약한 웹 애플리케이션이나 서버 설정이 있을 경우 공격자에게 노출될 수 있습니다.' },
    { port: 110, description: '이메일 수신 프로토콜로, 암호화되지 않은 방식으로 통신하는 경우 공격자가 이메일 내용을 가로챌 수 있습니다.' },
    { port: 135, description: 'Microsoft의 원격 프로시저 호출 서비스로, 취약점이 악용될 수 있습니다. 이 포트는 네트워크를 통해 원격에서 악성 코드가 유포될 수 있습니다.' },
    { port: 143, description: '이메일 수신 프로토콜로, 암호화되지 않으면 공격자가 이메일 데이터를 가로챌 수 있습니다.' },
    { port: 443, description: '보안된 웹 트래픽을 위한 포트로, 암호화된 통신을 사용하므로 상대적으로 안전하지만, 취약한 SSL/TLS 설정이나 공격을 받을 수 있습니다.' },
    { port: 445, description: '파일 공유와 같은 서비스에 사용되며, SMB 프로토콜을 통해 악용될 수 있습니다. 윈도우 시스템에서 주요 공격 벡터로 사용되므로, 취약점이 있으면 심각한 보안 위협이 됩니다.' },
    { port: 3389, description: '원격 데스크톱 프로토콜로, 강력한 인증 방식이 없을 경우 Brute Force 공격을 받을 수 있습니다.' },
    { port: 3306, description: 'MySQL 데이터베이스 서비스의 기본 포트입니다. 잘못된 설정이나 비밀번호가 약하면 데이터베이스에 접근할 수 있습니다.' },
    { port: 5432, description: 'PostgreSQL 데이터베이스의 기본 포트입니다. 마찬가지로 강력한 인증과 적절한 방화벽 설정이 없다면 위험할 수 있습니다.' },
    { port: 1521, description: 'Oracle 데이터베이스의 기본 포트로, 취약한 인증 방식이나 설정이 있을 경우 데이터베이스가 공격에 노출될 수 있습니다.' },
    { port: 8080, description: 'HTTP의 대체 포트로, 종종 웹 애플리케이션 방화벽을 우회하거나 테스트 목적으로 사용됩니다. 취약한 웹 애플리케이션에서 위험할 수 있습니다.' },
    { port: 1433, description: 'SQL 서버의 기본 포트로, 비밀번호가 약하거나 취약점이 있으면 데이터베이스 서버가 공격을 받을 수 있습니다.' },
    { port: 1434, description: 'SQL 서버에 대한 추가 서비스 포트로, 보안 설정이 적절하지 않으면 공격자가 시스템에 접근할 수 있습니다.' },
    { port: 1900, description: 'UPnP(Universal Plug and Play) 서비스는 네트워크에서 장치가 자동으로 연결되도록 지원하지만, 잘못된 설정이나 취약점이 있으면 원격에서 악용될 수 있습니다.' },
    { port: 4444, description: 'NetBus는 원격 제어 프로그램으로 악성 소프트웨어에서 사용되기도 합니다. 포트가 열려 있으면 해커가 원격으로 시스템에 접근할 수 있습니다.' }
  ];

  return (
    <div className="port-info-status">
      <h3>포트 정보</h3>
      <table className="port-info-table">
        <thead>
          <tr>
            <th>포트 번호</th>
            <th>설명</th>
          </tr>
        </thead>
        <tbody>
          {portData.map((port, index) => (
            <tr key={index}>
              <td>{port.port}</td>
              <td>{port.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PortInfo;
